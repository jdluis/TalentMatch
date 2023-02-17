const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// Auth Routes
const authRoutes = require('./auth.routes.js');
router.use('/auth', authRoutes);

module.exports = router;
