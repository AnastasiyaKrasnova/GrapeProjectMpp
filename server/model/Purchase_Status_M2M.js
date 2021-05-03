const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    status:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Purchase_Status"
    },
    purchase:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Purchase"
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

module.exports=mongoose.model('Purchase_Status_M2M',schema);