const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    sound_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sound"
    },
    enabled:{
        type: Boolean,
        default: false
    },

});

module.exports=mongoose.model('Purchase',schema);