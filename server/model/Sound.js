const { Double } = require('bson');
const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    catalog_num:{
        type: String,
        required: true,
        unique: true,
        max: 6
    },
    name:{
        type: String,
        required: true,
        max: 255
    },
    extention:{
        type: String,
        required: true,
        max: 5
    },
    full_url:{
        type: String,
        required: true,
    },
    demo_url:{
        type: String,
        required: true,
    }, 
    image_url:{
        type: String,
        required: true,
    },
    currency_code:{
        type: String,
        required: true,
        max:3
    },
    duration:{
        type: Number,
        min: 0.0
    },
    price:{
        type: Number,
        required: true,
        min: 0.0
    },
    author_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    deleted:{
        type: Boolean,
        default: false
    }

});

module.exports=mongoose.model('Sound',schema);