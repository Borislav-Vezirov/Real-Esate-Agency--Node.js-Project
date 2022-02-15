const { create, getAll } = require('../services/housingServices.js');

const router = require('express').Router();

router.get('/housing', async (req, res) => {
    
    const housings = await getAll();

    res.render('aprt-for-rent', { housings });
});


router.get('/create', (req, res) => {

    res.render('create');
});


router.post('/create', async (req, res) => {

    await create({ ...req.body, owner: req.user.id});

    res.redirect('/housing');
});


module.exports = router;