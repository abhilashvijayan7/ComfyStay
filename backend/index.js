/* eslint-disable no-undef */
require('dotenv').config();
const path = require('path');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('../backend/Routes/UserRoutes');
const adminRoutes = require('../backend/Routes/AdminRoutes');
app.use(bodyParser.json());
const cookieParser = require('cookie-parser');
app.listen(process.env.PORT,()=>{
    console.log('Server Started on PORT ',process.env.PORT); 
});
mongoose.connect('mongodb://localhost:27017/ComfyStay',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('DB connection Successful');
}).catch((err)=>{
    console.log(err.message);
});

app.use(cors({
    origin:process.env.CLIENT_URL,
    methods:['GET','POST'],
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());
// Static files
app.use(express.static(path.join(__dirname, 'public')));
//Middleware to parse form data

app.use('/',userRoutes);
app.use('/admin',adminRoutes);

 