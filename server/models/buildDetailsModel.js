import mongoose from 'mongoose'

const levelSchema = mongoose.Schema({
  level: {
    type: Number,
    required: true,
  },
  improvements: {
    skills: [
      {
        name: String,
        source: String,
      },
    ],
    attributes: {
      strength: Number,
      dexterity: Number,
      vitality: Number,
      energy: Number,
    },
  },
})

const buildDetailsSchema = mongoose.Schema({
  buildId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  levels: [levelSchema],
})

const BuildDetails = mongoose.model('BuildDetails', buildDetailsSchema)

export default BuildDetails
