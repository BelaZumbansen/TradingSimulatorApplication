import * as dotenv from 'dotenv'
import { model, Schema, Model, Document } from 'mongoose'

interface IJWTToken extends Document {
  authToken: string;
  email: string;
  expiry: Date;
}

const JWTTokenSchema : Schema = new Schema({
  authToken: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  expiry: { type: Date, required: true }
});

const JWT : Model<IJWTToken> = model<IJWTToken>('JWT', JWTTokenSchema);

export async function checkAuthToken(token : string) {

  const tokenDoc = await JWT.findOne({ authToken : token });

  if (!tokenDoc) {
    return null;
  }

  if (tokenDoc.expiry >= new Date()) {
    tokenDoc.remove();
    return null;
  }

  return tokenDoc.email;
}

export function storeAuthToken(token : string, email : string) {

  const thisInstant = new Date();
  thisInstant.setUTCHours(thisInstant.getUTCHours() + 12);
  JWT.create({ authToken : token, email : email, expiry : thisInstant});
}

export function invalidateToken(token : string) {
  JWT.findOneAndDelete({ authToken: token });
}