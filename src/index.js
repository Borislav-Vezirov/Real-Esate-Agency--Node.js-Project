const express = require('express');
const expressConfig = require('./config/expressConfig.js');
const hbsConfig = require('./config/hbsConfig.js');

const app = express();
const port = 3000;

hbsConfig(app);
expressConfig(app);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => console.log(`The app is running on http://localhost:${port}`));
