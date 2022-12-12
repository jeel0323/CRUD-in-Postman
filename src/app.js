const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("./db/conn.js");
const Student = require("./models/student.js")
const port = process.env.PORT || 3000 ; 
app.use(express.json());

// // DB connection
// mongoose.set('strictQuery', false);

// const mongoDB = "mongodb://0.0.0.0:27017/StudentsData";
// mongoose.connect(mongoDB, { 
//     useNewUrlParser: true,
//     useUnifiedTopology: true },
//     (err)=>{
//         if(err){
//             console.log(err)
//         }
//         else{
//             console.log("connection succcessfull")
//         }
// })
// //Db connection code ends

// Create new Student (C)
app.post("/", (req,res) =>{
    // console.log(req.body);
    const user = new Student(req.body);
    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((err)=>{
        res.status(400).send("Duplicate data!");
        console.log("Email of Phone already registered!")
    });
})

//Get Students (R)
app.get("/", async (req,res) =>{
    try{
        const StudentData = await Student.find();
        res.send(StudentData);
    }
    catch(err){
        res.send(err);
    }
})

//Get Student by id (R)
app.get("/:id", async (req,res) =>{
    try{
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        console.log(studentData);

        if(!studentData){
            return res.status(404).send("No data found");
        }
        else{
            res.send(studentData);
        }
    }
    catch(err){
        res.status(400).send(err);
    }
})

//Update the student using id (U)
app.patch("/:id", async (req,res) => {
    try{
        const _id = req.params.id;
        const UpdateStudent = await Student.findByIdAndUpdate(_id , req.body, {
            new: true
        });
        res.send(UpdateStudent)
    }
    catch(err){
        res.status(400).send(err);
    }
})

//Delete Student (D)
app.delete("/:id", async (req,res) => {
    try{
        const _id = req.params.id;
        const DeleteStudent = await Student.findByIdAndDelete(_id);
        
        if(!req.params.id){
            return res.status(400).send();
        }
        
        res.send(DeleteStudent);
    }
    catch(err){
        res.status(500).send(err);
    }
})

app.listen(port, () => {
    console.log(`Connection is setup at port ${port}`)
})