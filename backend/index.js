require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const userRoutes = require("../backend/Routes/UserRoutes")
app.use(bodyParser.json())
app.listen(process.env.PORT,()=>{
   console.log("Server Started on PORT ",process.env.PORT) 
});


app.use(cors({
    origin:process.env.CLIENT_URL,
    methods:["GET","POST"],
    credentials:true
}))

//Middleware to parse form data

app.use("/",userRoutes)
