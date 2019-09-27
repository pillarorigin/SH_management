const express=require("express");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path=require("path");
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

const app=express(); 
const port = 3000;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly: true,
        secure: false
    }
}));

app.use(flash());


app.get('/', (req, res) => {
    res.send("test test");
})

app.listen(port, () => {
    console.log('Server listening ...' + port);
})