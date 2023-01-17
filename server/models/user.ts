import app from '../config/app'
import bcrypt from 'bcrypt'
import * as mongoDB from 'mongodb'
import { ObjectId } from 'mongodb'
import * as jwt from 'jsonwebtoken'
import { model, Schema, Model, Document } from 'mongoose'
import { env, eventNames, exit } from 'process'
import * as dotenv from 'dotenv'
import { Request, Response } from 'express'
import { validateUserInformation } from '../services/validation'

interface IUser extends Document {
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
});

// Compile User Model
const UserModel : Model<IUser> = model<IUser>('User', UserSchema);

export class User {

  dateOfBirth: Date;
  name: string;
  email: string;
  jwtToken: string;

  constructor(name: string, email: string, dateOfBirth: Date, jwtToken: string) {

    this.name = name;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.jwtToken = jwtToken;
  }
}

async function hashPassword(password : string) : Promise<string> {

  return await bcrypt.hash(password, 10)
    .then(hash => {
      return hash;
    })
    .catch(err => {
      console.log(err);
      console.log('Failed to hash and set password value');
      // Should we be exiting here?
      return '';
    })
}

async function comparePassword(password : string, hash : string) : Promise<boolean> {
  
  return await bcrypt.compare(password, hash)
    .then(result=> {
      return result;
    })
    .catch(err => {
      console.log(err);
      return false;
    })
}

const generateAuthToken = function(userDoc : IUser) {

  const authToken = process.env.JWT_SECRET_KEY ? jwt.sign({ _id: userDoc._id}, process.env.JWT_SECRET_KEY) : '';
  return authToken;
}

export async function retrieveByEmail(email : string, authToken : string) {
  
  const userDoc = await UserModel.findOne({ email : email});

  if (!userDoc) {
    return null;
  }

  return new User(userDoc.name, userDoc.email, userDoc.dateOfBirth, authToken);
}

// Search database for user and authenticate based on the input credentials
export async function authenticateLogin(email : string, password : string) {

  const userDoc = await UserModel.findOne({ email : email});

  if (!userDoc) {
    return null;
  }

  if (await comparePassword(password, userDoc.password)) {
   
    const authToken = generateAuthToken(userDoc);
    return new User(userDoc.name, userDoc.email, userDoc.dateOfBirth, authToken);
  } else {
    return null;
  }
}

// Attempt to register new User
export async function registerUser(name: string, dateOfBirth: Date, email: string, password: string) {

  let userDoc = await UserModel.findOne({email : email});

  if (userDoc) {
    return null;
  }

  const hashVal = await hashPassword(password);

  if (!hashVal || hashVal.length == 0) {
    return null;
  }

  const userDocument = new UserModel({
    name: name,
    dateOfBirth: dateOfBirth,
    email: email,
    password: hashVal
  });

  const authToken = generateAuthToken(userDocument._id);

  await userDocument.save();

  return new User(name, email, dateOfBirth, authToken);
}