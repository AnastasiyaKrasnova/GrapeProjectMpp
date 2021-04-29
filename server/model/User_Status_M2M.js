const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    status:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User_Status"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    changed:{
        type: Date,
        default: Date.now,
    },
    deleted:{
        type: Boolean,
        default: false
    }

});

module.exports=mongoose.model('User_Status_M2M',schema);