const { AUTH_COOKIE_NAME, JWT_SECRET } = require('../config/index.js');
const jwt = require('../utils/jwt.js');


async function auth(req, res, next) {
    
    const token = req.cookies[AUTH_COOKIE_NAME];
    
    if(token){

        try {
            
            const decodedToken = await jwt.verify(token, JWT_SECRET);
     
            req.user = decodedToken;

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


module.exports = {
    auth,
    isAuth
}