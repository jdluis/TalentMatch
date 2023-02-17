
const express = require('express');
const router = express.Router();

const Company = require('../models/Company.model.js');
const Dev = require('../models/Dev.model.js');

router.get('/', async (req, res, next) => {
    
    try {
        const allCompanies = await Company.find()
        res.render('dev/main.hbs', {
            allCompanies
        })
    } catch (error) {
        next(error)
    }
});

router.post('/', async (req, res, next) => {
    
    try {
        


    } catch (error) {
        next(error)
    }
});

router.get('/:companyId/details', async (req, res, next) => {

    try {
        const company = await Company.findById(req.params.companyId)
        res.render('dev/companyDetails.hbs', {
            company
        })
    } catch (error) {
        next(error)
    }
});

router.post('/:companyId/details', async (req, res, next) => {
    
    try {
        
    } catch (error) {
        next(error)
    }
});

router.get('/profile', async (req, res, next) => {
    
    try {
        const user = await Dev.findById(req.session.User._id)
        res.render('dev/profile.hbs',{
            user
        })
    } catch (error) {
        next(error)
    }
});

router.get('/profile/edit', async (req, res, next) => {
    
    try {
        const user = await Dev.findById(req.session.User._id)
        res.render('dev/edit.hbs',{
            user
        })
    } catch (error) {
        next(error)
    }    
});

router.post('/profile/edit', async (req, res, next) => {
    
    try {
        
    } catch (error) {
        next(error)
    }    
});

module.exports = router;