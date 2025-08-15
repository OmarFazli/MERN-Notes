import Note from "../model/Note.js";

export const getAllNotes = async (req,res) => {
    try{
        const notes = await Note.find();

        res.status(200).json(notes);
    } catch (error){
        console.log("Error in getAllNotes: ", error);
        res.status(500).json({message:"Internal server error"});
    }
};

export const getNoteById = async (req,res) => {
    try{
        const fetchNote = await Note.findById(req.params.id);
        if (!fetchNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json(fetchNote);
    } catch (error){
        console.log("Error in getNoteById: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const createNote = async (req,res) => {
    try{
        const {title, body} = req.body;
        const newNote = new Note({title, body});
        await newNote.save();
        res.status(201).json({message:"post created"});
    } catch (error){
        console.log("Error in createNote: ", error);
        res.status(500).json({message:"Internal server error"});
    }
};

export const updateNote = async (req,res) => {
    try{
        const {title,body} = req.body;
        const updateNote = await Note.findByIdAndUpdate(req.params.id, {title, body});
        if (!updateNote) return res.status(404).json({message:"Note not found"});
        res.status(200).json({message:"Note updated successfully"});
    } catch (error){
        console.log("Error in updateNote: ", error);
        res.status(500).json({message:"Internal server error"});
    }
};

export const deleteNote =  async (req,res) => {
    try{
        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        if(!deleteNote) return res.status(404).json({message:"Note not found"});
        res.status(200).json({message: "Note deleted successfully"});
    } catch (error){
        console.log("Error in deleteNote: ", error);
        res.status(500).json({message:"Internal server error"});
    }
};