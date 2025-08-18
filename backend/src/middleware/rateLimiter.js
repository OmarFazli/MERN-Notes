import rateLimit from "../config/upstash.js";

const rateLimiter = async (req,res,next) => {
    try{
        const {success} = await rateLimit.limit("mern-notes-app");

        if(!success){
            return res.status(429).json({message:"Too many requests; Please try again later"});
        }
        next();
    } catch (error){
        console.log("Rate limit error: ", error);
        return res.status(500).json({message:"Internal server error"});
    }

}

export default rateLimiter;