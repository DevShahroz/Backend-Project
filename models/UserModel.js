const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:[true,"please add user name"],
    },
    email:{
        type:String,
        required:[true,"please add user email address"],
        unique:[true,"Email address already taken"],
    },
    password:{
        type:String,
        required:[true,"please add user pasword"],
    },
});

module.exports=mongoose.model("user",userSchema);