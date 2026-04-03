import express from "express"
import NotesController from "../controllers/notesController.js"
const notesController = new NotesController();

const router = express.Router()


router.get("/", notesController.getAllNotes);
router.get("/:id", notesController.getNoteById);
router.post("/", notesController.createNote);
router.delete("/:id", notesController.deleteNote);  
router.put("/:id", notesController.updateNote);


export default router