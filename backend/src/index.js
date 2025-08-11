import express from "express";
import dotenv from "dotenv";
import notesRouter  from "./routes/routes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

connectDB();

app.use("/api/notes", notesRouter);

app.listen(process.env.PORT||8080, ()=> {
    console.log("Server up and running!");
});


