import express from "express"
import notesRouter  from "./routes/routes.js";

const app = express();

app.use("/api/notes", notesRouter);

app.listen(3000, ()=> {
    console.log("Server started on port 3000");
});
