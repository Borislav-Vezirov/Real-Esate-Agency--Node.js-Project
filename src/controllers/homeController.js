const { getTop3Houses } = require('../services/housingServices.js');

const router = require('express').Router();


router.get('/', async (req, res) => {

    const housings = await getTop3Houses();

    res.render('home', {housings});
});

module.exports = router;