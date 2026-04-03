import Note from "../models/noteModel.js";

export default class NotesRepository {
  async findAll() {
    return Note.find();
  }

  async findById(id) {
    return Note.findById(id);
  }

  async findByEmail(email) {
    return Note.findOne({ email });
  }

  async findByEmailExcludingId(email, id) {
    return Note.findOne({ email, _id: { $ne: id } });
  }

  async create(data) {
    const note = new Note(data);
    return note.save();
  }

  async deleteById(id) {
    return Note.findByIdAndDelete(id);
  }

  async updateById(id, data) {
    return Note.findByIdAndUpdate(id, data, { returnDocument: "after" });
  }
}
