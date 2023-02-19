const express = require('express');
const router = express.Router();

const { updateLocals, isLogged, isDev, isCompany } = require('../middlewares/auth.middlewares.js');
router.use(updateLocals)

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// Auth Routes
const authRoutes = require('./auth.routes.js');
router.use('/auth', authRoutes);

// Dev Routes
router.use('/dev', isLogged, isDev, require('./dev.routes.js'));

// Company Routes
router.use('/company', isLogged, isCompany, require('./company.routes.js'));

module.exports = router;
