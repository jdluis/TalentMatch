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
    role: {
      type: String,
      default: "company",
      trim:true
    },
    description: {
        type: String,
        trim: true
    },
    img: {
      type: String,
      default: "/images/logoTalentMatch.png"
    },
    telephone: Number,
    direction: {
        type: String,
        trim: true
    },
    linkedin: {
        type: String,
        trim: true,
        default: "https://"
    },
    facebook: {
        type: String,
        trim: true,
        default: "https://"
    },
    twitter: {
        type: String,
        trim: true,
        default: "https://"
    },
    website: {
        type: String,
        trim: true,
        default: "https://"
    },
    markedDevs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dev",
      },
    ],
    techStack: [
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
          "MongoDB",
          "Git",
          "Boostrap",
          "PHP",
          "React Native",
          "Laravel",
          "Redux",
          "Java",
          "Python",
          "Wordpress",
          "Express"
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
