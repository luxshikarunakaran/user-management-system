import Note from "../models/Note.js";
import { errors } from "../utils/httpError.js";

export function listNotes(userId) {
  return Note.find({ user: userId }).sort("-updatedAt");
}

export async function createNote(userId, data) {
  return Note.create({ ...data, user: userId });
}

export async function updateNote(userId, id, data) {
  const note = await Note.findById(id);
  if (!note) throw errors.notFound("Note not found");
  if (note.user.toString() !== userId) throw errors.forbidden("Forbidden");
  Object.assign(note, data);
  return note.save();
}

export async function deleteNote(userId, id) {
  const note = await Note.findById(id);
  if (!note) throw errors.notFound("Note not found");
  if (note.user.toString() !== userId) throw errors.forbidden("Forbidden");
  await note.deleteOne();
  return { deleted: true };
}
