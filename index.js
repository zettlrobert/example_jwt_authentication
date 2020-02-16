const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();



// Connect to DB
const connectDB = async () => {

  const conn = await mongoose.connect(
    process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    console.log("Connected to DB")
  )
};

connectDB();


// Middleware
app.use(express.json()); // <-- recognize incomming request Objects as JSON


// Importing Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');



// Config
const PORT = process.env.PORT || 3000;


// Route Middleware
app.use('/api/user', authRoute); // everything in auth route has /api/user prefix
app.use('/api/posts', postRoute);


app.listen(PORT, () => {
  console.log("Server up and running");
})