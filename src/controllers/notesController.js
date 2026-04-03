import NotesService from "../services/notesService.js";

export default class NotesController {

    constructor() {
        this.notesService = new NotesService();

        this.getAllNotes = this.getAllNotes.bind(this);
        this.getNoteById = this.getNoteById.bind(this);
        this.createNote = this.createNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.updateNote = this.updateNote.bind(this);
    }
    async getAllNotes(req, res, next) {
        try {
            const notes = await this.notesService.getAllNotes();
            res.status(200).json(notes)
        } catch (error) {
            console.error("Error al devolver las notas", error)
            next(error);
        }
    }

    async getNoteById(req, res, next) {

        try {
            const id = req.params.id
            const note = await this.notesService.getNoteById(id);
            if (!note) return res.status(404).json({ error: "Nota no encontrada" })
            res.status(200).json(note)
        } catch (error) {
            console.error("Error al obtener nota por id", error)
            next(error);
        }
    }

    async createNote(req, res, next) {

        try {
            const { title, description, email, phone } = req.body;

            const savedNote = await this.notesService.createNote({ title, description, email, phone });
            if (savedNote) {
                res.status(201).json({ message: "Note created succesfully", note: savedNote })
            }
        } catch (error) {
            console.log("Error al crear la nota", error)
            next(error);
        }

    }

    async deleteNote(req, res, next) {
        try {
            const id = req.params.id
            const note = await this.notesService.deleteNote(id);
            if (!note) return res.status(404).json({ error: "Nota no encontrada" })
            res.status(200).json({ message: "Note eliminated successfully" })
        } catch (error) {
            console.error("Error al eliminar la nota", error)
            next(error);
        }
    }

    async updateNote(req, res, next) {

        try {
            const id = req.params.id
            const { title, description, email, phone } = req.body

            const updateData = await this.notesService.updateNote(id, { title, description, email, phone });
            if (!updateData) return res.status(404).json({ error: "Nota no encontrada." })
            res.status(200).json({ message: "Note updated succesfully", updateData })
        } catch (error) {
            console.error("Error al actualizar nota", error)
            next(error);
        }
    }

}