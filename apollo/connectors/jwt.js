import jwt from 'jsonwebtoken'

const createToken = async ({ id, email }, jwtSecret, expiresIn) =>
  await jwt.sign({ id, email }, jwtSecret, {
    algorithm: 'HS256',
    expiresIn: '7d'
  })

export { createToken }
