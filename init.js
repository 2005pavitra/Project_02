const mongoose = require("mongoose");
const Chat = require("./models/chat")

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

const chatAll = [
    {
    from:"pp",
    to:"dt",
    msg:"hi",
    created_at:new Date()
    },
    {
    from:"jhg",
    to:"jb",
    msg:"liuo",
    created_at:new Date()
    },
    {
    from:"jds",
    to:"sda",
    msg:"askdjn",
    created_at:new Date()
    },
    {
    from:"ask",
    to:"sa,k",
    msg:"asd",
    created_at:new Date()
    }

]

// Chat.insertMany(chatAll);
async function insertChats(){
    await Chat.insertMany(chatAll);
    console.log("Chats inserted successfully")
}

insertChats();