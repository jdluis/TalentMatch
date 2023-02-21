
const express = require('express');
const router = express.Router();
const fileUploader = require('../config/cloudinary.config.js');

const Company = require('../models/Company.model.js');
const Dev = require('../models/Dev.model.js');

const { isLogged, isDev } = require('../middlewares/auth.middlewares.js');

router.get('/',  async (req, res, next) => {
    
    try {
        const { search, favComp } = req.query;

        const devUser = await Dev.findById(req.session.User._id)
        if ( search || favComp) {
            if (favComp === 'true') {
                const companiesList = await Company.find({
                    '_id': {$in: devUser.favouritesCompanies},
                    $or: [
                        {companyName: new RegExp(search, 'i')},
                        {direction: new RegExp(search, 'i')},
                        {description: new RegExp(search, 'i')},
                        {techStack: new RegExp(search, 'i')},
                    ],
                });
                res.render('dev/main.hbs', {
                    companiesList
                });
            }
            if (search && favComp !== 'true') {
                const companiesList = await Company.find({
                    $or: [
                        {companyName: new RegExp(search, 'i')},
                        {direction: new RegExp(search, 'i')},
                        {description: new RegExp(search, 'i')},
                        {techStack: new RegExp(search, 'i')},
                    ],
                });
                res.render('dev/main.hbs', {
                    companiesList
                });
            };
        } else {
            const companiesList = await Company.find();
            res.render('dev/main.hbs', {
                companiesList,
            })
        };

    } catch (error) {
        next(error)
    }
});

router.get('/:companyId/details', async (req, res, next) => {

    try {
        const company = await Company.findById(req.params.companyId)
        const devUser = await Dev.findById(req.session.User._id).populate('favouritesCompanies')
        
        let isFavorite = false;
        devUser.favouritesCompanies.forEach(eachFav => {

            if (eachFav.companyName === company.companyName ) {
                isFavorite = true
            }
        });
        console.log(isFavorite);
        res.render('dev/companyDetails.hbs', {
            company,
            isFavorite
        })
    } catch (error) {
        next(error)
    }
});

router.post('/:companyId/details', async (req, res, next) => {
    
    try {
        const { favCompany, delCompany, message } = req.body;
        const { companyId } = req.params;

        if ( favCompany ) {

            await Dev.findByIdAndUpdate(req.session.User._id, {
                $push: { favouritesCompanies: favCompany },
                });
        } else {

            await Dev.findByIdAndUpdate(req.session.User._id, {
                $pull: { favouritesCompanies: delCompany },
                });
        };

        res.redirect(`/dev/${companyId}/details`);
    } catch (error) {
        next(error)
    }
});

router.get('/profile', async (req, res, next) => {
    
    try {
        const devUser = await Dev.findById(req.session.User._id).populate('favouritesCompanies')
        res.render('dev/profile.hbs',{
            devUser
        })
    } catch (error) {
        next(error)
    }
});

router.get('/profile/edit', async (req, res, next) => {
    
    try {
        const devUser = await Dev.findById(req.session.User._id);
        const enumValues = devUser.schema.path("techSkills").caster.enumValues;

        const selectedTechSkills = [];
        const deselectedTechSkills = [];

        enumValues.forEach(eachValue => {

            if (devUser.techSkills.includes(eachValue)) {
                selectedTechSkills.push(eachValue)
            } else {
                deselectedTechSkills.push(eachValue)
            }
        });
        res.render('dev/edit.hbs',{
            devUser,
            selectedTechSkills,
            deselectedTechSkills
        })
    } catch (error) {
        next(error)
    }    
});

router.post('/profile/edit', fileUploader.single('img'), async (req, res, next) => {
    
    try {
        const {
            name,
            secondName,
            email,
            telephone,
            location,
            experience,
            description,
            techSkills,
            softSkills,
            softSkillsChecked,
            linkedin,
            facebook,
            twitter,
            isWorking,
            existingImage
        } = req.body;

        let softSkillsArr = []

        if (softSkills !== '') {
            softSkillsArr = softSkills.split(",")
        }

        if (typeof softSkillsChecked === 'object') {

            softSkillsChecked.forEach(element => {
                softSkillsArr.unshift(element)
              });
          } else if (typeof softSkillsChecked === 'string') {
            softSkillsArr.unshift(softSkillsChecked)
          }

        await Dev.findByIdAndUpdate(req.session.User._id, {
            name,
            secondName,
            email,
            telephone,
            location,
            experience,
            description,
            techSkills: techSkills,
            softSkills: softSkillsArr,
            linkedin,
            facebook,
            twitter,
            isWorking,
            img: req.file ? req.file.path : existingImage,
        })
        res.redirect('/dev/profile')
    } catch (error) {
        next(error)
    }    
});

router.get('/profile/delete', async (req, res, next) => {
    const devUser = await Dev.findById(req.session.User._id).populate('favouritesCompanies')
    res.render('dev/delete.hbs', {
        devUser
    })
});

router.post('/profile/delete', async (req, res, next) => {
    try {
        await Dev.findByIdAndDelete(req.session.User._id)
        req.session.destroy( () => {
            res.redirect('/')
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router;