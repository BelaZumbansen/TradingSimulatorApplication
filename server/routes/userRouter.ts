import express from 'express';
import { Request, Response } from 'express'
import { attemptToLogin } from '../services/login';
import { attemptToSignUp } from '../services/signUp';

export const userRoute = express.Router();

interface LoginCredentials {
  name: string, 
  password: string
}

userRoute.post('/users/login', (req : Request, res: Response) => {
  console.log('Received Login Request');
  attemptToLogin(req, res);
});

userRoute.post('/users/signUp', (req: Request, res: Response) => {
  console.log('Received Sign Up request');
  attemptToSignUp(req, res);
});
