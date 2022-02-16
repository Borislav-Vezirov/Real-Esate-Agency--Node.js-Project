const { AUTH_COOKIE_NAME, JWT_SECRET } = require('../config/index.js');
const { getOne } = require('../services/housingServices.js');
const jwt = require('../utils/jwt.js');


async function auth(req, res, next) {
    
    const token = req.cookies[AUTH_COOKIE_NAME];
    
    if(token){

        try {
            
            const decodedToken = await jwt.verify(token, JWT_SECRET);
     
            req.user = decodedToken;
            res.locals.user = decodedToken;

            next();
        } catch (error) {
   
            res.clearCookie(AUTH_COOKIE_NAME);

            res.redirect('/auth/login');
        }

    }else{
        next();
    }
};

function isAuth(req, res, next) {
    
    if(req.user){
        next();
    }else{
        res.redirect('/auth/login');
    }
};

function isGuests(req, res, next){

    if(!req.user){
        next();
    }else{
        res.redirect('/')
    }
};

async function isOwner(req, res, next, id){

    const house = await getOne(id);

    if(house._id == req.user.id){
        res.redirect('/');
    }
    next();
}


module.exports = {
    auth,
    isAuth,
    isGuests,
    isOwner
}