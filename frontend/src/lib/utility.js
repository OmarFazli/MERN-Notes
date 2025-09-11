import toast from 'react-hot-toast';
import api from './axios.js';

const formatDateTime = (datetime) => {
    const time = datetime.toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit', hour12: true });
    const date = datetime.toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    return `${time} · ${date}`;
}

const rateLimitError = () => {
    toast.error("You are rate limited. Please try again later.");
}

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

export {formatDateTime};
export {rateLimitError};
export {handleNoteDelete};