const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("./db/conn.js");
const Student = require("./models/student.js")
const port = process.env.PORT || 3000 ; 
app.use(express.json());
const bcrypt = require('bcrypt');
const saltRounds = 4;

// Create new Student (C)
app.post("/register", (req,res) =>{
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const user = new Student({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: hash
        });
        
        user.save(function(err){
            if(err){
                console.log(err);
            }else{
                res.send("User Created");
                console.log("User Created");
            }
        });
    });
});

//Get Students (R) in sorted order of names
app.get("/allStudents/:page", async (req,res) => {
    try{
      let page;

      if(req.params.page){
          page = parseInt(req.params.page);
      }
      else{
          page = 1;
      }

      // define limit per page
      const limit = 2;
      const skip = (page - 1) * limit;

      // count total users
      const users = await Student.find({}).sort({"name": 1}).skip(skip).limit(limit);

      res.send(users);
    }
    catch(err){
        res.send(err);
    }
});

//Get Student 
app.get("/student", (req,res) =>{
    
        const email = req.body.email;
        const password = req.body.password;

        Student.findOne({email: email}, function(err, foundUser){
            if(err){
                console.log(err);
            }else {
                if (foundUser){
                    bcrypt.compare(password, foundUser.password, function(err, result){
                        if(result === true){
                            res.send(foundUser);
                            console.log("user found!");
                        }
                        else{
                            res.send("Password incorrect!");
                            console.log("Password incorrect!");
                        }
                    });
                }else{
                    res.send("User does not exist!");
                    console.log("User does not exist!");
                }
            }
        });
});

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