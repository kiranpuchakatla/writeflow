import mongoose from "mongoose";

const writingSessionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    totalPages: {
      type: Number,
      required: true,
      min: 1
    },

    completedPages: {
      type: Number,
      default: 0,
      min: 0
    },

    isRunning: {
      type: Boolean,
      default: false
    },

    elapsedSeconds: {
      type: Number,
      default: 0,
      min: 0
    },

    dailyLogs: {
      type: Map,
      of: Number,
      default: {}
    },

    finishedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "WritingSession",
  writingSessionSchema
);