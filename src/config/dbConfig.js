    const mongoose = require('mongoose');

    DB_CONNECTION_STRING = 'mongodb://localhost:27017/real-estate';

    function initDb(){

        return mongoose.connect(DB_CONNECTION_STRING);
    }

    module.exports = initDb;