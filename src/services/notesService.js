import NotesRepository from "../repositories/notesRepository.js";
import AppError from "../errors/AppError.js";

export default class NotesService {
    constructor() {
        this.notesRepository = new NotesRepository();
    }
    async getAllNotes(userId) {
        return this.notesRepository.findAllByUser(userId);
    }
    async getNoteById(id, userId) {
        return this.notesRepository.findByIdAndUser(id, userId);
    }
    async createNote(data) {
        return this.notesRepository.create(data);
    }
    async deleteNote(id, userId) {
        return this.notesRepository.deleteByIdAndUser(id, userId);
    }
    async updateNote(id, data, userId) {
        return this.notesRepository.updateByIdAndUser(id, data, userId);
    }
}