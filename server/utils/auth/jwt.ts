import jwt, { SignOptions } from 'jsonwebtoken'

const config = require('../../config')

export const signJwt = (keyID : string, payload: Object, options: SignOptions = {}) => {

  const secretKey = Buffer.from(
    config.jwt[keyID],
    'base64'
  ).toString('ascii');
  return jwt.sign(payload, secretKey, {
    ...(options && options),
    algorithm: 'HS256',
  });
};

export const verifyJwt = <T>(keyID : string, token: string): T | null => {
  try {
    const secretKey = Buffer.from(
      config.jwt[keyID],
      'base64'
    ).toString('ascii');
    return jwt.verify(token, secretKey) as T;
  } catch (error) {
    return null;
  }
};