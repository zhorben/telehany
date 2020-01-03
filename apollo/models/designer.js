import mongoose from 'mongoose'
import connection from '../libs/connection'

const designerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title отсутствует."
  },

  fullTitle: {
    type: String,
    required: "FullTitle отсутствует."
  },

  description: {
    type: String,
    required: "Description отсутствует."
  }
})

designerSchema.statics.publicFields = ['title', 'fullTitle', 'description']

designerSchema.index(
  { title: 'text', description: 'text' },
  {
    weights: { title: 10, description: 5 },
    default_language: 'english'
  }
)

export default connection.model('Designer', designerSchema)
