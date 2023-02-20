const express = require("express");
const router = express.Router();
const fileUploader = require('../config/cloudinary.config.js');

const Company = require("../models/Company.model.js");
const Dev = require("../models/Dev.model.js");


router.get("/", async (req, res, next) => {
  try {
    const { search, favDevs } = req.query;
    
    // Filter
    const company = await Company.findById(req.session.User._id)
    if (search || favDevs) {
      if (favDevs === "true") {
        const devList = await Dev.find({
          '_id': {$in: company.markedDevs},
          $or: [
            { name: new RegExp(search, "i") },
            { description: new RegExp(search, "i") },
            { secondName: new RegExp(search, "i") },
            { techSkills: new RegExp(search, "i") },
          ],
        });
        res.render("company/main.hbs", {
          devList,
        });
      }

      if (search && favDevs !== "true") {
        const devList = await Dev.find({
          $or: [
            { name: new RegExp(search, "i") },
            { description: new RegExp(search, "i") },
            { secondName: new RegExp(search, "i") },
            { techSkills: new RegExp(search, "i") },
          ],
        });
        res.render("company/main.hbs", {
          devList,
        });
      }
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
    const userCompany = await Company.findById(req.session.User._id).populate(
      "markedDevs"
    );

    let isFavorite = false;
    userCompany.markedDevs.forEach((eachFav) => {
      if (eachFav.name === devDetails.name) {
        isFavorite = true;
      }
    });

    res.render("company/devDetails.hbs", {
      devDetails,
      isFavorite,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/:devId/details", async (req, res, next) => {
  try {
    const { favDev, delDev } = req.body;
    const { devId } = req.params;

    if (favDev) {
      await Company.findByIdAndUpdate(req.session.User._id, {
        $push: { markedDevs: favDev },
      });
    } else {
      await Company.findByIdAndUpdate(req.session.User._id, {
        $pull: { markedDevs: delDev },
      });
    }

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

router.get("/profile/edit", async (req, res, next) => {
  try {
    const company = await Company.findById(req.session.User._id);
    const enumValues = company.schema.path("techStack").caster.enumValues;

    const selectedTechStack = [];
    const deselectedTechStack = [];
    
    enumValues.forEach((eachValue) => {
      if (company.techStack.includes(eachValue)) {
        selectedTechStack.push(eachValue);
      } else {
        deselectedTechStack.push(eachValue);
      }
    });

    res.render("company/edit.hbs", {
      company,
      selectedTechStack,
      deselectedTechStack,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/profile/edit", fileUploader.single('img'), async (req, res, next) => {
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
      existingImage
    } = req.body;

    await Company.findByIdAndUpdate(req.session.User._id, {
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
      img: req.file ? req.file.path : existingImage,

    });
    res.redirect("/company/profile");
  } catch (err) {
    next(err);
  }
});

router.get("/profile/delete", async (req, res, next) => {
  try {
    const company = await Company.findById(req.session.User._id);
    res.render("company/delete.hbs", {
      company,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/profile/delete", async (req, res, next) => {
  try {
    await Company.findByIdAndRemove(req.session.User._id);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
