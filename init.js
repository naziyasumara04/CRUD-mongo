const mongoose=require("mongoose");
const Chat=require("./models/Chat");

main()
.then(res=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
}

const allChats=[
    {
    from:"anushka",
    to:"virat",
    msg:"hello from mumbai",
    created_at:new Date()
    },
    {
    from:"alia",
    to:"ranbeer",
    msg:"hello from goa",
    created_at:new Date()
    },
    {
    from:"jacklin",
    to:"salman",
    msg:"hello from dubai",
    created_at:new Date()
    },
    {
    from:"shraddha",
    to:"varun",
    msg:"hello from bombay",
    created_at:new Date()
    }
];

Chat.insertMany(allChats)
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
});