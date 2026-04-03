import express from "express"
import { validateNoteCreate, validateNoteUpdate } from "../validators/notesValidator.js";
import NotesController from "../controllers/notesController.js"
const notesController = new NotesController();

const router = express.Router()


router.get("/", notesController.getAllNotes);
router.get("/:id", notesController.getNoteById);
router.post("/",validateNoteCreate, notesController.createNote);
router.delete("/:id", notesController.deleteNote);  
router.put("/:id",validateNoteUpdate, notesController.updateNote);


export default router