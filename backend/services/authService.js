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
