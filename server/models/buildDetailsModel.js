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

buildDetailsSchema.methods.getSummary = function () {
  // Reduce the entire levels array down to one entry
  // Summarize skills
  // Add up all attributes
  const characterSummary = this.levels.reduce(
    (accumulated, level) => {
      // Add all skills for this level into the skillsTotal
      if (level.improvements.skills && level.improvements.skills.length > 0) {
        level.improvements.skills.forEach((skill) => {
          if (!accumulated.skillsTotals.hasOwnProperty(skill.name)) {
            accumulated.skillsTotals[skill.name] = 0
          }

          accumulated.skillsTotals[skill.name] =
            accumulated.skillsTotals[skill.name] + 1
        })
      }

      // Add all attributes for this level into attributesTotals
      const attributes = level?.improvements?.attributes
      if (attributes) {
        accumulated.attributesTotals.strength += attributes?.strength ?? 0
        accumulated.attributesTotals.dexterity += attributes?.dexterity ?? 0
        accumulated.attributesTotals.vitality += attributes?.vitality ?? 0
        accumulated.attributesTotals.energy += attributes?.energy ?? 0
      }

      // Get the current level
      accumulated.currentLevel = Math.max(level.level, accumulated.currentLevel)

      return accumulated
    },
    {
      buildId: this.buildId,
      currentLevel: 0,
      skillsTotals: {},
      attributesTotals: {
        strength: 0,
        dexterity: 0,
        vitality: 0,
        energy: 0,
      },
    }
  )

  return characterSummary
}

const BuildDetails = mongoose.model('BuildDetails', buildDetailsSchema)

export default BuildDetails
