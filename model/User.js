const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  birthday: Date,
  lookingfor: String,
  connectionId: {
    type: String,
  },
  avatar: String,
  background: String,
  description: String,
  details: {
    liveIn: String,
    workAs: String,
    education: String,
    know: String,
    relationship: String,
    haveKids: String,
    smoke: String,
    drink: String,
    height: String,
    bodyType: String,
    eyes: String,
    hair: String,
  },
  interests: [String],
  preferences: {
    gender: String,
    ageRange: String,
    idealMan: {
      character: String,
      job: String,
      senseOfHumor: String,
      grooming: String,
      physique: String,
      arms: String,
      back: String,
    },
    interests: [String],
    personalityTraits: [String],
    idealDynamic: String,
  },
  photos: [String],
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: String,
//   connectionId: String,
//   avatar: String,
//   background: String,
//   description: String,
//   details: {
//     liveIn: String,
//     workAs: String,
//     education: String,
//     know: String,
//     relationship: String,
//     haveKids: String,
//     smoke: String,
//     drink: String,
//     height: String,
//     bodyType: String,
//     eyes: String,
//     hair: String,
//   },
//   interests: [String],
//   preferences: {
//     gender: String,
//     ageRange: String,
//     idealMan: {
//       character: String,
//       job: String,
//       senseOfHumor: String,
//       grooming: String,
//       physique: String,
//       arms: String,
//       back: String,
//     },
//     interests: [String],
//     personalityTraits: [String],
//     idealDynamic: String,
//   },
//   photos: [String],
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
