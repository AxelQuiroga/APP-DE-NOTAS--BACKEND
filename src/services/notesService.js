import NotesRepository from "../repositories/notesRepository.js";

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
        return this.notesRepository.create(data);
    }
    async deleteNote(id) {
        return this.notesRepository.deleteById(id);
    }
    async updateNote(id, data) {
        return this.notesRepository.updateById(id, data);
    }
}