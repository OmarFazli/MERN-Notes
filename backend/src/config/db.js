import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("MONGODB CONNECTION SUCCESSFUL")
    } catch(error){
        console.error("error connecting to mongodb:", error);
        process.exit(1)
    }
}