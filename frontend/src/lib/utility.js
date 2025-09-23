import toast from 'react-hot-toast';
import api from './axios.js';

// Get user's locale for date formatting, default to 'en-CA' if not available
const userLocale = navigator.language || 'en-CA';
const formatDateTime = (datetime) => {
    const time = datetime.toLocaleTimeString(userLocale, { hour: 'numeric', minute: '2-digit', hour12: true });
    const date = datetime.toLocaleDateString(userLocale, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    return `${time} · ${date}`;
}

// Utility function to notify user of rate limiting
const rateLimitError = () => {
    toast.error("You are rate limited. Please try again later.");
}

// Utility function to notify user of 404 errors
const notFoundError = () => {
    toast.error("The requested resource was not found.");
}

// Utility function to handle note deletion
const handleNoteDelete = async (e, id) => {
    e.preventDefault();
        
    if (!window.confirm("Are you sure you want to delete this note?")){
        return;
    }
    try{
        const res = await api.delete(`/notes/${id}`);
        if (res.status === 200){
            toast.success("Note deleted successfully");
        }
    } catch(error){
        if (error.response?.status === 429) {
            rateLimitError();
            return;
        }
        else if (error.response?.status === 404){
            toast.error("Note not found. It might have been already deleted.");
            return;
        }
        toast.error("Failed to delete note. Please try again later.");
        console.error("Delete note error: ", error);
    }
};

// Utility function to handle note update
const handleNoteUpdate = async (e, id, title, body) => {
    e.preventDefault();
    // do note update here
}

export {formatDateTime};
export {rateLimitError};
export {handleNoteDelete};
export {notFoundError};