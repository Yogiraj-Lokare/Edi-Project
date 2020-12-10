const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    test_name: {
      type: String,
      unique: true,
      required: true,
    },
    test_creator: {
      type: String,
      lowercase: true,
      required: true,
    },
    list: [
      {
        question: {
          type: String,
          required: true,
        },
        marks: {
          type: Number,
          default: 0,
        },
        mcqs: [
          {
            type: String,
            required: true,
          },
        ],
        answer: {
          type: Number,
        },
      },
    ],
    test_duration: {
      hour: {
        type: Number,
        required: true,
      },
      min: {
        type: Number,
        required: true,
      },
      second: {
        type: Number,
        required: true,
      },
    },
    test_type: {
      type: String,
      default: "Open",
    },
    allowed_users: [
      {
        type: String,
        lowercase: true,
      },
    ],
    start_time: {
      date: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },
    end_time: {
      date: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);
const Test = new mongoose.model("Test", schema);
module.exports = Test;
