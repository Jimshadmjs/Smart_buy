const express = require('express');
const session = require("express-session")
const path = require('path');
const userRoutes = require("./routes/user")
const adminRoutes = require('./routes/admin')
const connectDB = require("./db/connectDB")
const nocache = require("nocache")

require("dotenv").config()


const app = express();
app.use(nocache())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// Sessions for login (Admin and Users)
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
}));


app.use("/",userRoutes)
app.use("/admin",adminRoutes)



connectDB()
// Start Server

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

//
//
//