import { Link } from 'react-router'
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import formateDateTime from '../lib/utility.js'
import React from 'react'

const NoteCard = ({note}) => {
  return (
    <Link to={`/note/${note._id}`} 
    className='card bg-base-100 hover:shadow-lg border-t-4 border-solid border-primary transition-all duration-200'>
        <div className='card-body'>
            <h3 className='card-title text-base-content'>{note.title}</h3>
            <p className='text-base-content line-clamp-3'>{note.body}</p>
            <div className='card-actions justify-between items-center mt-4'>
                <span className='text-sm text-base-content/70'>{formateDateTime(new Date(note.createdAt))}</span>
                <div className='flex items-center gap-1'>
                    <PenSquareIcon className='size-4'/>
                    <button className='btn btn-ghost text-red-600 btn-xs'>
                        <Trash2Icon className='size-4'/>
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default NoteCard