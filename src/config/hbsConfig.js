const path = require('path');
const hbs  = require('express-handlebars');

function hbsConfig(app){

    app.engine('hbs', hbs.engine({
        extname: 'hbs'
    }));

    app.set('view engine', 'hbs');
    app.set('views', './src/views');
}

module.exports = hbsConfig;