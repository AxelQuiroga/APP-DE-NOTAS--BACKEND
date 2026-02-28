import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength:6,
        maxlength:110
    },
    email:{
        type: String,
        required: true,
        lowercase:  true,
        trim: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Email inválido']
    },
    phone:{
        type:String,
        required: true,
        trim: true,
        match: [/^\+?[0-9\s-]{8,20}$/, 'Número inválido']
    }
},{timestamps: true})

const Note = new mongoose.model("Note",noteSchema)

export default Note