import NotesRepository from "../repositories/notesRepository.js";
import AppError from "../errors/AppError.js";

export default class NotesService {
    constructor() {
        this.notesRepository = new NotesRepository();
    }
    async getAllNotes() {
        return this.notesRepository.findAll();
    }
    async getNoteById(id) {
        return this.notesRepository.findById(id);
    }
    async createNote(data) {
        const existing = await this.notesRepository.findByEmail(data.email);
        if (existing) {
            throw new AppError("Email ya registrado", 409);
        }
        return this.notesRepository.create(data);
    }
    async deleteNote(id) {
        return this.notesRepository.deleteById(id);
    }
    async updateNote(id, data) {
        if (data.email) {
            const existing = await this.notesRepository.findByEmailExcludingId(data.email, id);
            if (existing) {
                throw new AppError("Email ya registrado", 409);
            }
        }

        return this.notesRepository.updateById(id, data);
    }
}