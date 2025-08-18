import express from "express";
import dotenv from "dotenv";
import notesRouter  from "./routes/routes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();

connectDB();

app.use(express.json());

app.use((req,res,next) => {
    console.log(`Request made to ${req.url} using method ${req.method}`);
    next();
});
app.use(rateLimiter);
app.use("/api/notes", notesRouter);


app.listen(process.env.PORT||8080, ()=> {
    console.log("Server up and running!");
});


