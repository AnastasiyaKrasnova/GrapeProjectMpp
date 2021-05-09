const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    parent_category_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
});

module.exports=mongoose.model('Category',schema);