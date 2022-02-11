const { urlencoded } = require('body-parser');
const express = require('express');
const path    = require('path');
const cookieParser = require('cookie-parser');

const { auth } = require('../Middlewares/authMiddleware.js');

function expressConfig(app){

    app.use('/static', express.static('./src/static'));
    app.use(urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(auth);

}

module.exports = expressConfig;