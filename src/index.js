const express = require('express');
const expressConfig = require('./config/expressConfig.js');
const hbsConfig = require('./config/hbsConfig.js');
const routes = require('./config/routes.js');
const initDb = require('./config/dbConfig.js');

const app = express();
const port = 3000;

hbsConfig(app);
expressConfig(app);
app.use(routes);

start();

async function start(){

    try {

        await initDb();
        app.listen(port, () => console.log(`The app is running on http://localhost:${port}`));
        
    } catch (error) {
        console.log('Cannot connect database');
    }
}
