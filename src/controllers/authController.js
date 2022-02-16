const router = require('express').Router();
const bcrypt = require('bcrypt');
const { register, login } = require('../services/authService.js');

const { AUTH_COOKIE_NAME } = require('../config/index.js');
const { isGuests, isAuth } = require('../Middlewares/authMiddleware.js');



router.get('/register', isGuests, (req, res) => {
    res.render('register');
});

router.post('/register', isGuests, async (req, res) => {

    if(req.body.password !== req.body.repeatPassword){
        
        res.locals.error = 'Passwords must be equal!'
        return res.render('/register');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userData = {
        name           : req.body.name,
        username       : req.body.username,
        password       : hashedPassword
    };

    try {
        await register(userData);
        
        let token = await login(req.body.username, req.body.password);

        res.cookie(AUTH_COOKIE_NAME, token);
        
        res.redirect('/');
    } catch (error) {
        //TODO.....
        console.log(error);
    }

})

router.get('/login', isGuests, (req, res) => {
    res.render('login');
});

router.post('/login', isGuests, async (req, res) => {
    
    const { username, password } = req.body;

    try {
        const token = await login(username, password);
        
        res.cookie(AUTH_COOKIE_NAME, token);
        res.redirect('/');
        
    } catch (error) {
        //TODO.....
        console.log(error.message);
    }
});

router.get('/logout', isAuth, (req, res) => {
    
    res.clearCookie(AUTH_COOKIE_NAME);

    res.redirect('/');
});

module.exports = router;