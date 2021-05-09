const express=require('express');
const cors=require('cors');
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const path = require('path');
const cookies = require("cookie-parser");
var fileupload = require("express-fileupload");
const {serverPort} =require('./api_config.json');


global.appRoot = path.resolve(__dirname);

const sounds=require('./routes/sounds');
const users=require('./routes/users');
const categorys=require('./routes/categorys');
const purchases=require('./routes/purchases');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },
    ()=>{
        console.log('connected to db');
        mongoose.set('useFindAndModify', false);
    }
);

app.use(cors())
app.use(express.json());
app.use(fileupload());
app.use(cookies());

app.use('/sounds',sounds);
app.use('/users',users);
app.use('/categorys',categorys);
app.use('/purchases',purchases);



app.listen(serverPort, ()=>console.log('Server is running'));

