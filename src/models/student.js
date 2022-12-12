const mongoose = require("mongoose");
const validator = require("validator");

const Schema = new mongoose.Schema({
    
    name:{
        type : String,
        required:true
    },

    phone:{
        type:Number,
        required:true,
        minlength:10,
        maxlength:10,
        unique:[true,"Phone number already registered!!"]

    },

    email:{
        type:String,
        required:true,
        unique:[true, "Email already registered!!"],
        validate(value){
            if(!validator.isEmail(value))
            throw new Error("invalid email!!")
        }
    }
})

const Student = new mongoose.model('Student', Schema);
module.exports = Student;