//server.js
require('dotenv').config();
const express= require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app=express()
app.use(cors())
app.use(express.json())
app.use(cors({origin:'*'}))
// app.use(cors({origin:'http://localhost:3000'}))


const port=process.env.PORT||5000;
const customerRoute= require('./routes/customerRoute')
const orderRoute= require('./routes/orderRoute')
const adminRoute= require('./routes/adminRoute')
const mongoURI=process.env.MONGODB_URI
mongoose.connect(mongoURI,{


    useNewUrlParser: true,
    useUnifiedTopology: true,


})  

const db=mongoose.connection

db.once('open', () => {
    console.log('Connected to MongoDB');
  });
  app.get('/hello', (req, res) => {
    res.send('hello worDFDld');
  });

  app.use('/api/customer',customerRoute)
  app.use('/api/payments',orderRoute)
  app.use('/api/admin',adminRoute)
app.listen(port,()=>{

    console.log(`server is running on ${port}`);

})