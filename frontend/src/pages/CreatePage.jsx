import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { set } from 'mongoose'
import axios from 'axios'
import { rateLimitError } from '../lib/utility.js'

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title.trim() || !body.trim()){
      toast.error("Title and Body are required");
      return;
    }

    setIsLoading(true);
    try{
      const res = await axios.post('http://localhost:3000/api/notes', {title, body});
      if (res.status === 201){
        toast.success("Note created successfully");
        //setTitle("");
        //setBody("");
        setIsLoading(false);
      }
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
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto p-4'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className='btn btn-primary text-center mb-6'>
            <ArrowLeftIcon className='size-5'/>
            Back to Home
          </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input type="text" 
                  placeholder='Note Title'
                  className='input input-bordered w-full' 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Body</span>
                  </label>
                  <textarea 
                    placeholder='This is a Note about...' 
                    className='textarea textarea-bordered h-32 w-full'
                    value={body}
                    onChange={(e) => setBody(e.target.value)} 
                  />
                </div>

                <div className='card-actions justify-end'>
                  <button type='submit' className='btn btn-primary' disabled={isLoading}>
                    {isLoading ? '...' : 'Create Note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage