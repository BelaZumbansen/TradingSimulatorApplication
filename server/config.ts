import * as dotenv from 'dotenv'

dotenv.config()

const config = {
  app : {
    port: 3001,
  },
  db : {
    uri: process.env.MONGODB_URI || ''
  },
  jwt : {
    accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY || '',
    accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY || '',
    refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY || '',
    refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY || '',
    accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY || '',
    refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY || '',
    accessTokenExpiresIn: 15,
    refreshTokenExpiresIn: 59
  }
}

module.exports = config