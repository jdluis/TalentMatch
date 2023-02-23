
const express = require('express');
const router = express.Router();

const { isNotLogged } = require('../middlewares/auth.middlewares.js');

const Company = require('../models/Company.model.js');
const Dev = require('../models/Dev.model.js');
const bcrypt = require('bcryptjs');

router.get('/signup', isNotLogged, (req, res, next) => {
    res.render('auth/signup-form.hbs')
});

router.post('/signup', async (req, res, next) => {

    const { email, password, passwordCheck, role } = req.body;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    // Validations
    if ( email === "" || password === "" || passwordCheck === "" || role === undefined) {

        res.status(401).render('auth/signup-form.hbs', {
            errorMsg: "All inputs must be completed"
        })
        return
    };

    if ( password !== passwordCheck) {

        res.status(401).render('auth/signup-form.hbs', {
            errorMsg: "Passwords must coincide"
        })
        return
    };

     if ( passwordRegex.test(password) === false) 
         res.status(401).render('auth/signup-form.hbs', {
             errorMsg: "Password is not stronger enough"
         })
         return
     });

    try {
        
        const foundDev = await Dev.findOne({email: email});
        const foundCompany = await Company.findOne({email: email});

        if ( foundDev !== null || foundCompany !== null) {

            res.status(401).render('auth/signup-form.hbs', {
                errorMsg: "This email is registered"
            })
            return
        };

        // Encript Password
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create User
        if ( role === 'dev') {
            await Dev.create({
                email,
                password: hashPassword,
                name: email
            })
        } else {
            await Company.create({
                email,
                password: hashPassword,
                companyName: email
            })
        };

        // Redirect Login
        res.redirect('/auth/login');

    } catch (error) {

        next(error);
    };
});

router.get('/login', isNotLogged, (req, res, next) => {
    res.render('auth/login-form.hbs');
});

router.post('/login', async (req, res, next) => {

    const { email, password } = req.body;

    if ( email === "" || password === "" ) {

        res.status(401).render('auth/login-form.hbs', {
            errorMsg: "All inputs must be completed"
        })
        return
    };

    try {
        
        const foundDev = await Dev.findOne({email: email});
        const foundCompany = await Company.findOne({email: email});

        if ( foundDev === null && foundCompany === null) {
            res.status(401).render('auth/login-form.hbs', {
                errorMsg: "This email is not registered"
            })
            return
        };

        if ( foundDev ) {
            const checkPassword = await bcrypt.compare(password, foundDev.password);

            if ( checkPassword === false ) {

                res.status(401).render('auth/login-form.hbs', {
                    errorMsg: "Wrong password, try again!"
                })
                return
            };

            req.session.User = foundDev;
            req.session.save(() => {
                //main de dev
                if (foundDev.name === foundDev.email){
                    res.redirect('/dev/profile')
                } else {
                    res.redirect('/dev')
                }
            })

        } else if ( foundCompany ) {
            const checkPassword = await bcrypt.compare(password, foundCompany.password);

            if ( checkPassword === false ) {
                res.status(401).render('auth/login-form.hbs', {
                    errorMsg: "Wrong password, try again!"
                })
                return
            };

            req.session.User = foundCompany;
            req.session.save(() => {
                //main de company
                if (foundCompany.companyName === foundCompany.email) {
                    res.redirect('/company/profile')
                } else {
                    res.redirect('/company')
                }
            })
        };

    } catch (error) {
        
        next(error)
    }  
})

router.get('/logout', (req, res, next) => {
    req.session.destroy( () => {
        res.redirect('/')
    })
})

module.exports = router;