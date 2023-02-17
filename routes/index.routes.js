const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/auth/login", (req, res, next) => {
  res.render("auth/login-form.hbs")
})

module.exports = router;
