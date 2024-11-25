const express = require("express");
const methodOverride = require('method-override');
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const PORT = 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
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

app.get("/chats/new", async(req,res) =>{
    res.render("new.ejs")
})

//create Route
app.post("/chats",async(req,res) =>{
    const {from, msg, to} = req.body;
    const newChat =  new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    newChat.save()
    .then(res =>{
        console.log("Chat was created")
    })
    .catch(res =>{
        console.log("Error in creating new chat")
    })
    res.redirect("/chats")
})

app.get("/chats/:id/edit", async(req, res) =>{
    const {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat})
})

//update route
app.put("/chats/:id", async(req,res) =>{
    let {id} = req.params;
    let {newMsg} = req.body;
    const updatedChat =await Chat.findByIdAndUpdate(id, 
        {msg: newMsg},
        {runValidators:true, new:true})

        console.log(updatedChat)
        res.redirect("/chats")
})

//delete route
app.delete("/chats/:id", async(req,res) =>{
    let {id} = req.params;
    const deletedChats = await Chat.findByIdAndDelete(id);

    console.log(deletedChats)
    res.redirect("/chats");

    
})

app.listen(PORT, () =>{
    console.log(`Server is listening on PORT ${PORT}`);
})