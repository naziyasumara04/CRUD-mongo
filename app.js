const express = require('express');
const mongoose=require("mongoose");
const Chat=require("./models/Chat");
const methodOverride = require('method-override')

const app=express();
const port=3000;
const path=require("path");

main()
.then(res=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
}


app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public/CSS')));





app.get("/chats",async(req,res)=>{
    const chats=await Chat.find();
    res.render("chat.ejs",{chats});
    
});

app.get("/chats/new",(req,res)=>{
    res.render("form.ejs");
});

app.post("/chats",async (req,res)=>{
    let {from,msg,to}=req.body;

    await Chat.insertMany([
        { from: from,
         msg: msg,
        to:to,
        created_at:new Date()
    }
])
.then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    });
    
    res.redirect("/chats");
});

app.get("/chats/:id/edit",async(req,res)=>{
    const chatId = req.params.id;
    const chat = { id: chatId, message: "Example message" };
    
    res.render("edit.ejs",{ chats: chat });
});

app.put("/chats/:id",async(req,res)=>{
    const chatId = req.params.id;
    const updatedMessage = req.body.msg;
    console.log(chatId);
    await Chat.findByIdAndUpdate(chatId, {msg:updatedMessage},{new:true})
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    });
    
    res.redirect("/chats");
   
});

app.delete("/chats/:id/delete",async(req,res)=>{
    const chatId = req.params.id;
    await Chat.findByIdAndDelete(chatId,{new:true})
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    });
    // console.log("deleted");
    res.redirect("/chats");
});

app.listen(port,()=>{
    console.log(`https://localhost:${port}`);
});


