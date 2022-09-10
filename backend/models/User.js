const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'Please enter first name'],
      trim: true,
      text: true,
    },
    last_name: {
      type: String,
      required: [true, 'Please enter last name'],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, 'Please enter username'],
      trim: true,
      text: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter email'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
    },
    picture: {
      type: String,
      trim: true,
      default:
        'https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png',
    },
    cover: {
      type: String,
      trim: true,
    },
    gender: {
      tyrpe: String,
      trim: true,
      required: [true, 'Please enter gender'],
    },
    BYear: {
      type: Number,
      required: true,
      trim: true,
    },
    BMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    BDay: {
      type: Number,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    fiends: {
      types: Array,
      default: [],
    },
    followings: {
      types: Array,
      default: [],
    },
    followers: {
      types: Array,
      default: [],
    },
    requests: {
      types: Array,
      default: [],
    },
    search: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      workPlace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: ['Single', 'In a relationship', 'Married', 'Divorced'],
      },
      instagram: {
        type: String,
      },
    },
    savedPost: [
      {
        post: {
          type: mongoose.Schema.ObjectId,
          ref: 'Post',
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
