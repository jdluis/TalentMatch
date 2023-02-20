require("dotenv").config();
require('../db/index.js');


const { default: mongoose } = require('mongoose');
const Dev = require('../models/Dev.model.js');
const Company = require('../models/Company.model.js');

const devs = require('./devs.json');
const companies = require('./companies.json');

const insertData = async () => {
    try {
        
        await Dev.deleteMany()
        await Company.deleteMany()

        await Dev.create(devs)
        await Company.create(companies)
        
        console.log('Data added!')
        mongoose.connection.close()
    } catch (error) {
        console.log('Ops! There is a problem!', error)
    }
}

insertData();
