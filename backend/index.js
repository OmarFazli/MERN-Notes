import express from "express"

const app = express()

app.get("/api/notes", (req,res) => {
    res.send("u sent an API request")
})

app.listen(3000, ()=> {
    console.log("Server started on port 3000");
});