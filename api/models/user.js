const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Languages = require('./languages');
const Instruments = require('./instruments');

const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 14,
    },
    roles: [
      {
        type: String,
        enum: ['candidate', 'teacher', 'student', 'admin'],
      },
    ],
    badges: [{ type: Schema.Types.ObjectId, ref: 'Badges' }],
    profilePictureUrl: String,
    linkedin: String,
    spotify: String,
    itunes: String,
    soundcloud: String,
    about: String,
    experience: String,
    links: [String],
    youtubeVideos: [String],
    awards: [String],
    references: [String],
    interests: [{ type: String, enum: Instruments }],
    playedInstruments: [{ type: String, enum: Instruments }],
    languages: [{ type: String, enum: Languages, required: true }],
    classes: [{ type: Schema.Types.ObjectId, ref: 'Classroom' }],
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    totaltime: [{ date: String, time: Number }],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
