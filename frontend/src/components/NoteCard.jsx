import { Link } from 'react-router'
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import {formatDateTime} from '../lib/utility.js'
import React from 'react'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'
import { rateLimitError } from '../lib/utility.js'

const NoteCard = ({note, onDelete}) => {
    const handleDelete = async (e, id) => {
        e.preventDefault();
        
        if (!window.confirm("Are you sure you want to delete this note?")){
            return;
        }
        try{
            const res = await api.delete(`/notes/${id}`);
            if (res.status === 200){
                toast.success("Note deleted successfully");
                onDelete(); // Refresh notes on parent component
            }
        } catch(error){
            if (error.response?.status === 429) {
                rateLimitError();
                return;
            }
            else if (error.response?.status === 404){
                toast.error("Note not found. It might have been already deleted.");
                onDelete(); // Refresh notes on parent component
                return;
            }
            toast.error("Failed to delete note. Please try again later.");
            console.error("Delete note error: ", error);
        }
    }
  return (
    <Link to={`/note/${note._id}`} 
    className='card bg-base-100 hover:shadow-lg border-t-4 border-solid border-primary transition-all duration-200'>
        <div className='card-body'>
            <h3 className='card-title text-base-content'>{note.title}</h3>
            <p className='text-base-content line-clamp-3'>{note.body}</p>
            <div className='card-actions justify-between items-center mt-4'>
                <span className='text-sm text-base-content/70'>{formatDateTime(new Date(note.createdAt))}</span>
                <div className='flex items-center gap-1'>
                    <PenSquareIcon className='size-4'/>
                    <button className='btn btn-ghost text-red-600 btn-xs' onClick={(e) => handleDelete(e, note._id)}>
                        <Trash2Icon className='size-4'/>
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default NoteCard