const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        enum : ['normal','warning','banned'],
        default: 'normal'
    }
});

module.exports=mongoose.model('User_Status',schema);