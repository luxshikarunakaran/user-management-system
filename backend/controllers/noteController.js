import * as noteService from "../services/noteService.js";

export async function listNotes(req, res, next) {
  try {
    const notes = await noteService.listNotes(req.user.id);
    res.json({ success: true, notes });
  } catch (err) {
    next(err);
  }
}

export async function createNote(req, res, next) {
  try {
    const note = await noteService.createNote(req.user.id, req.body);
    res.status(201).json({ success: true, note });
  } catch (err) {
    next(err);
  }
}

export async function updateNote(req, res, next) {
  try {
    const note = await noteService.updateNote(
      req.user.id,
      req.params.id,
      req.body
    );
    res.json({ success: true, note });
  } catch (err) {
    next(err);
  }
}

export async function deleteNote(req, res, next) {
  try {
    const result = await noteService.deleteNote(req.user.id, req.params.id);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}
