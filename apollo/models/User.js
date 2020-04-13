import mongoose from 'mongoose'
import connection from '../libs/connection'

const userSchema = new mongoose.Schema({
  displayName:   {
    type:     String,
    required: "Имя пользователя отсутствует."
  },
  email:         {
    type:     String,
    unique:   "Такой email уже существует",
    required: "E-mail пользователя не должен быть пустым",
    validate: [
      {
        validator: function checkEmail(value) {
          return this.deleted ? true : /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
        },
        msg:       'Укажите, пожалуйста, корректный email'
      }
    ]
  },
  deleted: Boolean,
  gender: {
    type: String,
    enum: {
      values:  ['male', 'female'],
      message: "Неизвестное значение для пола."
    }
  },
  password: {
    type: String,
    required: true
  },
  verificationToken: String,
  verifiedEmail: Boolean,
}, {
  timestamps: true
})

userSchema.statics.publicFields = ['email', 'displayName']

export default connection.model('User', userSchema)
