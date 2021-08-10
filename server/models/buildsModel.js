import mongoose from 'mongoose'

const buildSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CharacterClass',
    required: true,
  },
  // Build details isn't initially required
  // This is here to allow an easy query via .populate
  buildDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BuildDetails',
  },
  name: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
})

const Build = mongoose.model('Build', buildSchema)

export default Build
