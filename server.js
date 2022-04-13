const express = require('express');
const mongoose =require('mongoose');
const liveDataRoutes = require('./routes/liveDataRoute')

const app=express();
require("dotenv").config();

app.use(express.json());

app.use(liveDataRoutes);


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("DB is Connected Successfully");
}).catch((err)=>{
    console.log(err.message);
})


app.listen(process.env.PORT,()=>{
    console.log(`Server started on port ${process.env.PORT} `);
})
