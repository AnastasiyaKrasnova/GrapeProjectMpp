const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        enum : ['carted','bought','downloaded','error'],
        default: 'carted'
    }
});

module.exports=mongoose.model('Purchase_Status',schema);