const { urlencoded } = require('body-parser');
const express = require('express');
const path    = require('path');
const cookieParser = require('cookie-parser');

function expressConfig(app){

    app.use('/static', express.static('./src/static'));
    app.use(urlencoded({ extended: true }));
    app.use(cookieParser());
}

module.exports = expressConfig;