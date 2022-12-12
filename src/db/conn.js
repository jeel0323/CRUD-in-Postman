const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

const mongoDB = "mongodb://0.0.0.0:27017/StudentsData";
mongoose.connect(mongoDB, { 
    useNewUrlParser: true,
    useUnifiedTopology: true },
    (err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("connection succcessfull")
        }
})