import express from "express"
import Note from "../models/noteModel.js"

const router = express.Router()

//obtener  todas las notas
router.get("/",async(req,res) =>{
    try {
        const notes = await Note.find()
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error al devolver las notas",error)
        res.status(500).json({error:"Internal server error"})
    }
})
//obtener las notas por id
router.get("/:id",async(req,res)=>{
    try {
        const id = req.params.id
        const note = await Note.findById(id)
        if(!note) return res.status(404).json({error:"Nota no encontrada"})
        res.status(200).json(note)
        } catch (error) {
        console.error("Error al obtener nota por id",error)
        res.status(500).json({error: "Internal server error"})
    }
})


//crear una nueva nota
router.post("/",async(req,res) =>{
    try {
        const {title,description} = req.body
        const note = new Note({title,description})
        const savedNote = await note.save()
        if(savedNote){
            res.status(201).json({message: "Note created succesfully",note: savedNote})
        }
    } catch (error) {
        console.log("Error al crear la nota",error)
        res.status(500).json({eror: "Internal server error"})
    }
})


//eliminar nota
router.delete("/:id",async(req,res) =>{
    try {
        const id = req.params.id
        const note = await Note.findByIdAndDelete(id)
        if (!note) return res.status(404).json({error:"Nota no encontrada"})
        res.status(201).json({message:"Note deleted succesfully",note})
    } catch (error) {
        console.log("Error al eliminar la nota",error)
        res.status(500).json({error: "Internal server error"})
    }
})

//editar una nota
router.put("/:id",async(req,res)=>{
    try {
        const id = req.params.id
        const {title,description} = req.body
        
        const updateData = await Note.findByIdAndUpdate(id,{title,description},{returnDocument:'after'})
        if (!updateData) return res.status(404).json({error:"Nota no encontrada."})
        res.status(201).json({message:"Note updated succesfully",updateData})
        } catch (error) {
        console.error("Error al actualizar nota",error)
        res.status(500).json({error:"Internal server error"})
    }
    
})



export default router