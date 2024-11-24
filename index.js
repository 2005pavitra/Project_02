const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat")
const PORT = 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

main()
.then(() =>{
    console.log("mongodb connected")
})
.catch(() =>{
    console.log("connection failed")
})

async function main(){
   await mongoose.connect("mongodb://127.0.0.1:27017/project02")
}

const chat1 = new Chat({
    from:"pp",
    to:"dt",
    msg:"hi",
    created_at:new Date()
})

chat1.save()
.then((res) =>{
    console.log(res)
})

app.get("/", (req,res)=>{
    res.send("Working fine")
})

app.listen(PORT, () =>{
    console.log(`Server is listening on PORT ${PORT}`);
})