import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import toast from 'react-hot-toast';
import api from '../lib/axios';
import { handleNoteDelete, rateLimitError } from '../lib/utility.js';
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from 'lucide-react';

const NoteDetailsPage = () => {
  const [note, setNote] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const navigate = useNavigate();
  const handleDelete = async (e) => {
    setIsDeleting(true);
    e.preventDefault();
    await handleNoteDelete(e, note._id);
    setIsDeleting(false);
    navigate("/");
  };
  const handleSave = async (e) => {};
  const { id } = useParams();
  const fetchNoteDetails = async () => {
    setNote(null);
    setIsLoading(true);
    // Fetch note details from backend using the id param
    try {
      const res = await api.get(`/notes/${id}`);
      console.log("Fetched note details response: ", res);
      console.log(res.data);
      setNote(res.data);
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("Note not found");
        navigate("/");
        return;
      }
      else if (error.response?.status === 429) {
        rateLimitError();
        navigate("/");
        return;
      }
      else {
        toast.error("Failed to fetch note details. Please try again later.");
        navigate("/");
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNoteDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <LoaderIcon className='size-6 animate-spin text-primary' />
        <div className='ml-2 text-lg'>Loading note details...</div>
      </div>
    );
  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto p-4'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <Link to='/' className='btn btn-primary text-center'>
              <ArrowLeftIcon className='h-5 w-5'></ArrowLeftIcon>
              Back to Home
            </Link>
            <button onClick={(e) => handleDelete(e)} className='btn btn-error btn-outline' disabled={isDeleting}>
              <Trash2Icon className='h-4 w-4'></Trash2Icon>
              {isDeleting ? '...' : 'Delete Note'}
            </button>
          </div>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input type="text"
                  placeholder='Note Title'
                  className='input input-bordered w-full'
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Body</span>
                </label>
                <textarea
                  placeholder='This is a Note about...'
                  className='textarea textarea-bordered h-32 w-full'
                  value={note.body}
                  onChange={(e) => setNote({ ...note, body: e.target.value })}
                />
              </div>

              <div className='card-actions justify-end'>
                <button className='btn btn-primary' disabled={isSaving} onClick={handleSave}>
                  {isSaving ? '...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailsPage