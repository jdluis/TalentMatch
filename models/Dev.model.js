const { Schema, model } = require("mongoose");

const devSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    secondName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: "/images/defaultAvatar.png"
    },
    telephone: Number,
    location: {
      type: String,
      trim: true,
    },
    experience: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
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
      },
    ],
    softSkills: [String],
    resume: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    facebook: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
    favouritesCompanies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Company",
      },
    ],
    isWorking: Boolean,
    role: {
      type: String,
      default: "dev",
    },
  },
  {
    timestamps: true,
  }
);

const Dev = model("Dev", devSchema);

module.exports = Dev;
