import express, { Request, Response, NextFunction } from 'express'
import { loginHandler } from '../utils/auth/login';
import { registerHandler } from '../utils/auth/signUp';
import { persistentLoginHandler } from '../utils/auth/access';
import { refreshHandler } from '../utils/auth/refresh';

export const authRoute = express.Router();

authRoute.post('/api/auth/login', (req: Request, res: Response, next: NextFunction) => {
  console.log('Received Login Request');
  loginHandler(req, res, next);
});

authRoute.post('/api/auth/signUp', (req: Request, res: Response, next: NextFunction) => {
  console.log('Received Sign Up Request');
  registerHandler(req, res, next);
});

authRoute.get('/api/auth/persistentLogin', (req: Request, res: Response, next: NextFunction) => {
  console.log('Received Persistent Login Request');
  persistentLoginHandler(req, res, next);
});

authRoute.get('/api/auth/refresh', (req: Request, res: Response, next: NextFunction) => {
  console.log('Received a Refresh Token Request');
  refreshHandler(req, res, next);
});