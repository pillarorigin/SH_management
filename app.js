const express=require("express");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path=require("path");
const session = require('express-session');
const app=express(); 
const port = 3000;


app.get('/', (req, res) => {
    res.send("test test");
})

app.listen(port, () => {
    console.log('Server listening ...' + port);
})