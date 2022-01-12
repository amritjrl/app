const mongoose=require('mongoose')
const UserSchema= new mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        enum:['male','female','others'],
        require:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
})