const { Schema, model } = require("mongoose");

const CompanySchema = new Schema(
  {
    companyName: {
      type: String,
      unique: true,
      trim:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim:true
    },
    password: {
      type: String,
      required: true,
      trim:true
    },
    rol: {
      type: String,
      default: "company",
      trim:true
    },
    description: {
        type: String,
        trim: true
    },
    telephone: Number,
    direction: {
        type: String,
        trim: true
    },
    Linkedin: {
        type: String,
        trim: true
    },
    Facebook: {
        type: String,
        trim: true
    },
    Twitter: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    markedDevs: [
      {
        type: ObjectId,
        ref: "Dev",
      },
    ],
    techSkills: [
      {
        type: String,
        enum: [
          "JS",
          "TS",
          "React",
          "Angular",
          "Vue.JS",
          "Vite",
          "TailwindCSS",
          "CSS",
          "HTML",
          "NodeJS",
          "Mongo BD",
          "Git",
          "Boostrap",
          "PHP",
          "React Native",
          "Laravel",
          "Redux",
          "Java",
          "Python",
          "Wordpress",
        ],
        trim: true
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Company = model("Company", CompanySchema);

module.exports = Company;