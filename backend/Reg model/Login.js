const mongoose = require('mongoose')


const mongoschema=mongoose.Schema({
    name:String,
    number:Number,
    email:String,
    password:String,
 })

module.exports=mongoose.model('userReg',mongoschema)