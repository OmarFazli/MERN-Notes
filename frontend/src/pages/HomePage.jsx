import React, { use, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import toast from 'react-hot-toast';
import {rateLimitError} from '../lib/utility.js';
import axios from 'axios'; 
import NoteCard from '../components/NoteCard';

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try{
        const res = await axios.get('http://localhost:3000/api/notes');
        setNotes(res.data);
        console.log("Fetched notes: ", res.data);
        setIsLoading(false);
      } catch(error){
        if (error.response?.status === 429) {
          rateLimitError();
          return;
        } else{
          toast.error("Failed to fetch notes. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  },[])

  return (
    <div className="min-h-screen">
      <NavBar/>

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {isLoading && <div className='text-center mt-10 text-lg'>Loading...</div>}
        {!isLoading && notes.length === 0 && <div className='text-center text-primary'> No Notes to show</div>}
        {!isLoading && notes.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>)
        }
      </div>
    </div>
  )
}

export default HomePage