const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat")
const PORT = 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")))

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


app.get("/chats", async(req,res)=>{
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", {chats});

})

app.listen(PORT, () =>{
    console.log(`Server is listening on PORT ${PORT}`);
})