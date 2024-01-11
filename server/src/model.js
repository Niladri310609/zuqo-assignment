const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
   firstName: {type:String,required:true, trim: true},
   lastName: {type:String, required:true,trim: true},
   email: {type:String, required:true, unique:true,trim: true},
   password:{type:String, required:true, unique:true,trim: true}, // bcrypted
   token: {
       type: String,
       default: ''
   },
} ,{timestamps:true});
 
 module.exports = mongoose.model('User', UserSchema)