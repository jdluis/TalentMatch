const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// Auth Routes
const authRoutes = require('./auth.routes.js');
router.use('/auth', authRoutes);

// Dev Routes
router.use('/dev', require('./dev.routes.js'));

// Company Routes
router.use('/company', require('./company.routes.js'));

module.exports = router;
