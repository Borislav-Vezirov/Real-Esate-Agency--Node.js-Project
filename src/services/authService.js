const User = require('../models/User.js');
const jwt  = require('../utils/jwt.js');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'hjgb54hgbhlsy67ly6u67lutdstb';


async function register(userData){

    User.create(userData);
};

async function login(username, password){
    
    const user = await User.findOne({ username });
    console.log(user.password);

    if(!user){
        throw new Error('Username or passward are invalid!');
    };

    let isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        throw new Error('Username or passward are invalid!');
    };

    const payload = {
        id      : user._id,
        name    : user.name, 
        username: user.username
    };

    const token = await jwt.sign(payload, JWT_SECRET);

    return token;

};


module.exports = {
    register,
    login
}