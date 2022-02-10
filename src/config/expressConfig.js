const express = require('express');
const path    = require('path');

function expressConfig(app){

    app.use('/static', express.static('./src/static'));
}

module.exports = expressConfig;