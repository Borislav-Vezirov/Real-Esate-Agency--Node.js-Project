const router = require('express').Router();
const bcrypt = require('bcrypt');
const { register, login } = require('../services/authService.js');

const AUTH_COOKIE_NAME = 'auth_token';

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {

    if(req.body.password !== req.body.repeatPassword){
        
        res.locals.error = 'Passwords must be equal!'
        return res.render('/register');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
        name           : req.body.name,
        username       : req.body.username,
        password       : hashedPassword
    };

    try {
        await register(userData);
        
        res.redirect('/');
    } catch (error) {
        //TODO.....
        console.log(error);
    }

})

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    
    const { username, password } = req.body;

    try {
        const token = await login(username, password);
        
        res.cookie(AUTH_COOKIE_NAME, token);
        res.redirect('/');
        
    } catch (error) {
        //TODO.....
        console.log(error.message);
    }
})

module.exports = router;