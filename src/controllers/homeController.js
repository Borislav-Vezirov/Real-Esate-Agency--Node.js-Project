const { getTop3Houses, search } = require('../services/housingServices.js');

const router = require('express').Router();


router.get('/', async (req, res) => {

    const housings = await getTop3Houses();

    res.render('home', {housings});
});

router.get('/search', async (req, res) => {
    
   const housings = await search(req.query.text);
   
   res.render('search', { housings })
});

module.exports = router;