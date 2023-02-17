const express = require("express");
const router = express.Router();

const Company = require("../models/Company.model.js");
const Dev = require("../models/Dev.model.js");

router.get("/", async (req, res, next) => {
  try {
    const devList = await Dev.find();
    res.render("company/main.hbs", {
      devList,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { search, markedDevs, experience } = req.body;
    console.log(req.body);
    // Filter
    if (search || markedDevs || experience) {
      const devList = await Dev.find();
      res.render("company/main.hbs", {
        devList,
      });
    } else {
      const devList = await Dev.find();
      res.render("company/main.hbs", {
        devList,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:devId/details", async (req, res, next) => {
  try {
    const devDetails = await Dev.findById(req.params.devId);
    res.render("company/devDetails.hbs", {
      devDetails,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/:devId/details", async (req, res, next) => {
  try {
    const { markDev } = req.body;
    const { devId } = req.params;
    await Company.findByIdAndUpdate(req.session.User._id, {
      $push: { markedDevs: markDev },
    });
    res.redirect(`/company/${devId}/details`);
  } catch (err) {
    next(err);
  }
});

router.get("/profile", async (req, res, next) => {
  try {
    const company = await Company.findById(req.session.User._id).populate(
      "markedDevs"
    );
    res.render("company/profile.hbs", {
      company,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/edit", async (req, res, next) => {
  try {
    const company = await Company.findById(req.session.User._id);
    res.render("company/edit.hbs", {
      company,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/edit", async (req, res, next) => {
  try {
    const {
      companyName,
      email,
      description,
      telephone,
      direction,
      linkedin,
      facebook,
      twitter,
      website,
      techStack,
    } = req.body;

    const company = await Company.findByIdAndUpdate(req.session.User._id,{
      companyName,
      email,
      description,
      telephone,
      direction,
      linkedin,
      facebook,
      twitter,
      website,
      $push: { techStack: techStack }
      
    });
    res.redirect("/company/profile");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
