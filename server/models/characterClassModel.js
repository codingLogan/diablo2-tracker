import mongoose from 'mongoose'

const skillSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  baseLevelRequirement: {
    type: Number,
    required: true,
  },
})

const skillTreeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  skills: [skillSchema],
})

const characterClassSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  skillTrees: [skillTreeSchema],
})

const CharacterClass = mongoose.model('CharacterClass', characterClassSchema)

export default CharacterClass
