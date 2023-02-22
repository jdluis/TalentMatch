const express = require('express');
const router = express.Router();

const { updateLocals, isLogged, isNotLogged, isDev, isCompany } = require('../middlewares/auth.middlewares.js');
router.use(updateLocals)

/* GET home page */
router.get("/", isNotLogged, (req, res, next) => {
  res.render("index");
});

// Auth Routes
const authRoutes = require('./auth.routes.js');
router.use('/auth', authRoutes);

// Dev Routes
router.use('/dev', isLogged, isDev, require('./dev.routes.js'));

// Company Routes
router.use('/company', isLogged, isCompany, require('./company.routes.js'));

// Message Routes
router.use('/message', isLogged, require('./message.routes.js'));

module.exports = router;
