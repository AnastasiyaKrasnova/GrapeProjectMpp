const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
        max: 25
    },
    last_name:{
        type: String,
        required: true,
        max: 25
    },
    login:{
        type: String,
        required: true,
        max: 25
    },
    email:{
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 25
    },
    password_hash:{
        type: String,
        required: true,
        min: 5,
        max: 100
    },
    role:{
        type: String,
        enum : ['user','author','admin'],
        default: 'user'
    }

});

module.exports=mongoose.model('User',schema);