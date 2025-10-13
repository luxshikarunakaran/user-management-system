import * as userService from "../services/userService.js";

export async function listUsers(req, res, next) {
  try {
    const users = await userService.listUsers();
    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
}

export async function changeRole(req, res, next) {
  try {
    const updated = await userService.changeRole(req.params.id, req.body.role);
    res.json({ success: true, user: updated });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}
