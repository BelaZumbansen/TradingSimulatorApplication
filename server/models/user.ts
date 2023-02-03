import { model, Schema, Model, Document } from 'mongoose'

export interface IUser extends Document {
  name: string;
  dateOfBirth: Date,
  email: string;
  password: string;
}

// Define User Schema
const UserSchema : Schema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255, 
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 255
  },
}, {
  strictQuery: true,
});

// Compile User Model
export const UserModel : Model<IUser> = model<IUser>('User', UserSchema);

export class User {

  dateOfBirth: Date;
  name: string;
  email: string;
  hashPass: string

  constructor(userDoc : IUser) {

    this.name = userDoc.name;
    this.email = userDoc.email;
    this.dateOfBirth = userDoc.dateOfBirth;
    this.hashPass = userDoc.password;
  }
}