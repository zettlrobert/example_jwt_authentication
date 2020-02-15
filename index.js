const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Connect to DB
const connectDB = async () => {

  const conn = await mongoose.connect(
    'mongodb://localhost:27017/example_jwt_authentication',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    console.log("Connected to DB")
  )
};

connectDB();


// Importing Routes
const authRoute = require('./routes/auth');

// Config
const PORT = process.env.PORT || 3000;


// Route Middleware
app.use('/api/user', authRoute); // everything in auth route has /api/user prefix



app.listen(PORT, () => {
  console.log("Server up and running");
})