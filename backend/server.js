//server.js
require('dotenv').config();
const express= require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app=express()
app.use(cors())
app.use(express.json())
app.use(cors({origin:'*'}))

// app.use('/api/order',require('./routes/orderRoute'))

const port=process.env.PORT ||5000
const customerRoute= require('./routes/customerRoute')
const orderRoute= require('./routes/orderRoute')
const adminRoute= require('./routes/adminRoute')
mongoose.connect('mongodb+srv://arijitdasofficial05:FekwKsMxgNZDO7iA@cluster0.w35zck2.mongodb.net/',{


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