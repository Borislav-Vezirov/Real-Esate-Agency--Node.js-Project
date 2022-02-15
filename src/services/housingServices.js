const Housing = require('../models/Housing.js');

async function create(houseData){

    return await Housing.create(houseData);
};

async function getTop3Houses(){

    return await Housing.find().sort({createdAt: -1}).limit(3).lean(); 
};

async function getAll(){

    return await Housing.find({}).lean(); 
};

module.exports = {
    create,
    getTop3Houses,
    getAll

};