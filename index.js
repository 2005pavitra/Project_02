const express = require("express");
const app = express();
const mongoose = require("mongoose")
const PORT = 8080;

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

app.get("/", (req,res)=>{
    res.send("Working fine")
})

app.listen(PORT, () =>{
    console.log(`Server is listening on PORT ${PORT}`);
})