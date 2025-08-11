import express from "express"
import { getAllNotes, createNote, updateNote, deleteNote } from "../controllers/notesController.js";

const notesRouter = express.Router();

notesRouter.get("/", getAllNotes)
notesRouter.post("/", createNote);
notesRouter.put("/:id", updateNote);
notesRouter.delete("/:id", deleteNote);

export default notesRouter;