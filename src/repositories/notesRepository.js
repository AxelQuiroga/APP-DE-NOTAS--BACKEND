import Note from "../models/noteModel.js";

export default class NotesRepository {
  async findAllByUser(userId) {
    return Note.find({ user: userId });
  }

  async findByIdAndUser(id, userId) {
    return Note.findOne({ _id: id, user: userId });
  }

  async create(data) {
    const note = new Note(data);
    return note.save();
  }

  async deleteByIdAndUser(id, userId) {
    return Note.findOneAndDelete({ _id: id, user: userId });
  }

  async updateByIdAndUser(id, data, userId) {
    return Note.findOneAndUpdate(
      { _id: id, user: userId },
      data,
      { new: true, runValidators: true }
    );
  }
}
