import User from "../models/User.js";
import { errors } from "../utils/httpError.js";

export function listUsers() {
  return User.find().select("name email role createdAt").sort("-createdAt");
}

export async function changeRole(userId, role) {
  const user = await User.findById(userId);
  if (!user) throw errors.notFound("User not found");
  user.role = role;
  await user.save();
  return { id: user._id, name: user.name, email: user.email, role: user.role };
}

export async function deleteUser(userId) {
  const user = await User.findById(userId);
  if (!user) throw errors.notFound("User not found");
  await user.deleteOne();
  return { deleted: true };
}
