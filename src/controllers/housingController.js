const { isAuth, isOwner } = require('../Middlewares/authMiddleware.js');
const { create, getAll, getOne, addTenant, deleteHouse, updateOne } = require('../services/housingServices.js');
const { errorHandler } = require('../utils/errorHandler.js');

const router = require('express').Router();

router.get('/housing', async (req, res) => {
    
    const housings = await getAll();

    res.render('aprt-for-rent', { housings });
});


router.get('/create', isAuth, (req, res) => {

    res.render('create');
});


router.post('/create', isAuth, async (req, res) => {

    try {
        
        await create({ ...req.body, owner: req.user.id});
    
        res.redirect('/housing');
        
    } catch (error) {
        
        res.render('create', { error: errorHandler(error) });
    }
});

router.get('/details/:id', async (req, res) => {
    
    const house = await getOne(req.params.id);
    
    const isOwner = house.owner == req.user?.id;

    const tenants = house.getTenants();

    const houseData = await house.toObject();

    const isRented = house.tenants.some(x => x._id == req.user?.id);

    const isAvailable = house.availablePieces > 0;
    
    res.render('details', {...houseData, isOwner, tenants, isRented, isAvailable}); 
});

router.get('/details/:id/rent', isAuth, async (req, res) => {
    
    await addTenant(req.params.id, req.user.id);

    res.redirect(`/details/${req.params.id}`);
});

router.get('/details/:id/delete', isAuth, isOwner, async (req, res) => {
    
    await deleteHouse(req.params.id);

    res.redirect('/housing'); 
});

router.get('/details/:id/edit', async (req, res) => {

    const house = await getOne(req.params.id);

    res.render('edit', { ...house.toObject() }); 
});

router.post('/details/:id/edit', isAuth, async (req, res) => {
    

    try {
        
        await updateOne(req.params.id, req.body);
        
        res.redirect(`/details/${req.params.id}`);
    } catch (error) {
        
        res.render('edit', { error: errorHandler(error) });
    }
});


module.exports = router;