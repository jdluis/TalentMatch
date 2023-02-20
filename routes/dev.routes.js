
const express = require('express');
const router = express.Router();

const Company = require('../models/Company.model.js');
const Dev = require('../models/Dev.model.js');

const { isLogged, isDev } = require('../middlewares/auth.middlewares.js');

router.get('/',  async (req, res, next) => {
    
    try {
        const response = await Company.find()
        res.render('dev/main.hbs', {
            response
        })
    } catch (error) {
        next(error)
    }
});

router.post('/', async (req, res, next) => {
    
    try {
        const { techStack, favCompanies, search } = req.body; 
        console.log(search);
        const allCompanies = await Company.find()
        const response = []
        console.log(response);

        allCompanies.forEach( (eachCompany) => {
            if ( eachCompany.companyName == search) {
                response.push(eachCompany)
            }
        })
        res.render('dev/main.hbs', {
            response
        })
    } catch (error) {
        next(error)
    }
});

router.get('/:companyId/details', async (req, res, next) => {

    try {
        const company = await Company.findById(req.params.companyId)
        const user = await Dev.findById(req.session.User._id).populate('favouritesCompanies')

        let isFavorite = false;
        user.favouritesCompanies.forEach(eachFav => {

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
        const { favCompany, delCompany } = req.body;
        const { companyId } = req.params;

        if ( favCompany ) {

            await Dev.findByIdAndUpdate(req.session.User._id, {
                $push: { favouritesCompanies: favCompany },
                });
        } else {

            await Dev.findByIdAndUpdate(req.session.User._id, {
                $pull: { favouritesCompanies: delCompany },
                });
        }
        res.redirect(`/dev/${companyId}/details`);
    } catch (error) {
        next(error)
    }
});

router.get('/profile', async (req, res, next) => {
    
    try {
        const user = await Dev.findById(req.session.User._id).populate('favouritesCompanies')
        console.log(user)
        res.render('dev/profile.hbs',{
            user
        })
    } catch (error) {
        next(error)
    }
});

router.get('/profile/edit', async (req, res, next) => {
    
    try {
        const user = await Dev.findById(req.session.User._id);
        const enumValues = user.schema.path("techSkills").caster.enumValues;

        const selectedTechSkills = [];
        const deselectedTechSkills = [];

        enumValues.forEach(eachValue => {

            if (user.techSkills.includes(eachValue)) {
                selectedTechSkills.push(eachValue)
            } else {
                deselectedTechSkills.push(eachValue)
            }
        });
        res.render('dev/edit.hbs',{
            user,
            selectedTechSkills,
            deselectedTechSkills
        })
    } catch (error) {
        next(error)
    }    
});

router.post('/profile/edit', async (req, res, next) => {
    
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
            isWorking
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

        const user = await Dev.findByIdAndUpdate(req.session.User._id, {
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
            isWorking
        })
        res.redirect('/dev/profile')
    } catch (error) {
        next(error)
    }    
});

router.get('/profile/delete', (req, res, next) => {
    res.render('dev/delete.hbs')
});

router.post('/profile/delete', async (req, res, next) => {
    try {
        await Dev.findByIdAndDelete(req.session.User._id)
        res.redirect('/')
    } catch (error) {
        next(error)
    }
})

module.exports = router;