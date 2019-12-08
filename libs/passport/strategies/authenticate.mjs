import User from '../../../models/User'

export default async (strategy, email, displayName, done) => {

  if (!email) {
    return done(null, false, 'Не указан email')
  }

  try {
    let user = await User.findOne({ email })

    if (user) {
      return done(null, user)
    }

    user = await User.create({
      email, displayName,
    })

    done(null, user)
  } catch (err) {
    done(err)
  }
  
}
