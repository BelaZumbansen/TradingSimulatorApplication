import jwt, { SignOptions } from 'jsonwebtoken'

const config = require('../../config')

// Generate and Sign a new JWT Authentication Token
export const signJwt = (keyID : string, payload: Object, options: SignOptions = {}) => {

  try {

    // Retrieve and Decrypt the Secret Key
    const secretKey = Buffer.from(
      config.jwt[keyID],
      'base64'
    ).toString('ascii');
    // Sign Token and attach Payload
    return jwt.sign(payload, secretKey, {
      ...(options && options),
      algorithm: 'HS256',
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};

// Verify JWT Token
export const verifyJwt = <T>(keyID : string, token: string): T | null => {
  
  try {

    // Retrieve and Decrypt the Secret Key
    const secretKey = Buffer.from(
      config.jwt[keyID],
      'base64'
    ).toString('ascii');
    // Verify Token
    return jwt.verify(token, secretKey) as T;
  } catch (err) {
    console.log(err);
    return null;
  }
};