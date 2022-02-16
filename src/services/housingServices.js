
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

async function getOne(id){

    return await Housing.findById(id).populate('tenants');
};

async function addTenant(houseId, tenantId){

    const house = await getOne(houseId);

    if(house._id == tenantId){
        res.redirect('/');
    }
    
    house.tenants.push(tenantId);

    house.availablePieces -= 1;

    return await house.save();
};

async function deleteHouse(id){

    return await Housing.findByIdAndDelete(id);
};

async function updateOne(id, housedata){

    return await Housing.findByIdAndUpdate(id, housedata);
};

async function search(text){

    let match = new RegExp(text)

    return await Housing.find({type: {$regex: match, $options: 'i'}}).lean();
}

module.exports = {
    create,
    getTop3Houses,
    getAll,
    getOne,
    addTenant,
    deleteHouse,
    updateOne,
    search
};