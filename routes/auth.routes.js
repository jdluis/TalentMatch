
const express = require('express');
const router = express.Router();

const Company = require('../models/Company.model.js');
const Dev = require('../models/Dev.model.js');
const bcrypt = require('bcryptjs');

router.get('/signup', (req, res, next) => {
    res.render('auth/signup-form.hbs')
});

router.post('/signup', async (req, res, next) => {

    const { email, password, passwordCheck, role } = req.body;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    // Validations
    if( email === "" || password === "" || passwordCheck === "" || role === undefined) {
        res.status(401).render('auth/signup-form.hbs', {
            errorMsg: "All inputs should be completed"
        })
        return
    };

    if( password !== passwordCheck) {
        res.status(401).render('auth/signup-form.hbs', {
            errorMsg: "Password should be equal"
        })
        return
    };

    // if ( passwordRegex.test(password) === false) {
    //     res.status(401).render('auth/signup-form.hbs', {
    //         errorMsg: "Password should be strongest"
    //     })
    //     return
    // };

    try {
        
        const foundDev = await Dev.findOne({email: email});
        const foundCompany = await Company.findOne({email: email});
        console.log(foundDev)
        console.log(foundCompany)

        if ( foundDev !== null || foundCompany !== null) {
            res.status(401).render('auth/signup-form.hbs', {
                errorMsg: "Email registered!, try again!"
            })
            return
        };

        // Encript Password
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create User
        if( role === 'dev') {
            await Dev.create({
                email,
                password: hashPassword
            })
        } else if( role === 'company') {
            await Company.create({
                email,
                password: hashPassword
            })
        };

        // Redirect Login
        res.redirect('/auth/login')

    } catch (error) {

        next(error)
    }
});

router.get('/login', (req, res, next) => {
    res.render('auth/login-form.hbs')
})

module.exports = router;