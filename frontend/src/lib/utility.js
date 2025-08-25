import toast from 'react-hot-toast';

const formatDateTime = (datetime) => {
    const time = datetime.toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit', hour12: true });
    const date = datetime.toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    return `${time} · ${date}`;
}

const rateLimitError = () => {
    toast.error("You are rate limited. Please try again later.");
}

export {formatDateTime};
export {rateLimitError};