import { Link } from 'react-router'
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import {formatDateTime} from '../lib/utility.js'
import React from 'react'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'
import { rateLimitError } from '../lib/utility.js'
import { handleNoteDelete } from '../lib/utility.js'

const NoteCard = ({note, onDelete}) => {
    const handleDelete = async (e, id) => {
        e.preventDefault();
        await handleNoteDelete(e, id);
        onDelete(); // Refresh notes on parent component
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