import Attributes from '../models/attributesModel.js'
import CharacterClass from '../models/characterClassModel.js'

async function getCharacterClasses(req, res, next) {
  try {
    const classes = await CharacterClass.find({})
    res.json(classes)
  } catch (error) {
    next(error)
  }
}

async function getAttributes(req, res, next) {
  try {
    const attributes = await Attributes.find({})
    res.json(attributes)
  } catch (error) {
    next(error)
  }
}

export { getCharacterClasses, getAttributes }
