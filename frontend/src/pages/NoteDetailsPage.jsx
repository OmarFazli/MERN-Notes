import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';
import api from '../lib/axios';
import { rateLimitError } from '../lib/utility.js';

const NoteDetailsPage = () => {
  const [note, setNote] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);

  const navigate = useNavigate();
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
      console.log("Fetched note details: ", note);
    }
  };

  useEffect(() => {
    fetchNoteDetails();
  }, [id]);

  console.log(note)
  return (
    <div>NoteDetailsPage</div>
  )
}

export default NoteDetailsPage