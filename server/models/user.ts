import app from '../config/app'
import bcrypt from 'bcrypt'
import * as mongoDB from 'mongodb'
import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import { env, eventNames, exit } from 'process'
import * as dotenv from 'dotenv'
import { Request, Response } from 'express'

const { Schema } = mongoose;

// Define User Schema
const userSchema = new Schema({
  _id: String,
  user_name: String,
  user_email: String,
  user_password: String,
  portfolios: [ObjectId],
  lastAccessTimestamp: Date
});

// Define User Methods
userSchema.methods.getPortfolioId = function getPortfolioId() {
  return this.portfolioId;
};

// Compile User Model
const UserModel = mongoose.model('User', userSchema);

export class User {

  private password: string;
  private dbItem;
  name: string;
  email: string;
  private portfolio_ids: [];

  constructor(name: string, email: string, password: string) {

    this.name = name;
    this.email = email;
    this.password = '';
    this.portfolio_ids = []
    // Updates password with 
    this.hashPassword(password);
    this.dbItem = new UserModel({_id: email, user_name: name, user_email: email, portfolios: []});
  }

  private hashPassword(password : string) {

    bcrypt.hash(password, 10)
      .then(hash => {
        this.password = password;
      })
      .catch(err => {
        console.log(err);
        console.log('Failed to hash and set password value');
        // Should we be exiting here?
        exit;
      })
  }
  
  private comparePassword(password : string) {
    
    bcrypt.compare(password, this.password)
      .then(result=> {
        return result;
      })
      .catch(err => {
        console.log(err);
        // Should we be exiting here?
        exit;
      })
  }

  public async updateInDatabase() {
    this.dbItem.lastAccessTimestamp = new Date();
    await this.dbItem.save();
  }
}

export function validatePassword(password: string, hash : string) {
  
}