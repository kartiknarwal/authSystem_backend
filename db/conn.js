const mongoose =require("mongoose");

const DB ="mongodb+srv://kartiknarwal2085:KARTIKNARWAL2004@cluster0.zfdzb2g.mongodb.net/Authusers?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log("DataBase Connected")).catch((errr)=>{
    console.log(errr);
})