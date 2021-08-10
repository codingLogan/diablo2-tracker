import mongoose from 'mongoose'

const attributesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

const Attributes = mongoose.model('Attributes', attributesSchema)
export default Attributes
