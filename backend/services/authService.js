import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { errors } from "../utils/httpError.js";

export async function register({ name, email, password, role }) {
  const exists = await User.findOne({ email });
  if (exists) throw errors.conflict("Email already in use");
  const user = await User.create({ name, email, password, role });
  const token = generateToken(user._id, user.role);
  return {
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
  };
}

export async function login({ email, password }) {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw errors.unauthorized("Invalid credentials");
  const ok = await user.comparePassword(password);
  if (!ok) throw errors.unauthorized("Invalid credentials");
  const token = generateToken(user._id, user.role);
  return {
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
  };
}

export async function updateProfile(userId, { name, email, password }) {
  const user = await User.findById(userId).select("+password");
  if (!user) throw errors.notFound("User not found");

  if (email && email !== user.email) {
    const exists = await User.findOne({ email });
    if (exists && String(exists._id) !== String(userId)) {
      throw errors.conflict("Email already in use");
    }
    user.email = email;
  }

  if (name) user.name = name;
  if (password) user.password = password; // will be hashed by pre-save hook

  await user.save();

  return {
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
}
