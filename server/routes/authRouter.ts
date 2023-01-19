import express, { Request, Response, NextFunction } from 'express'
import { loginHandler, logoutHandler } from '../utils/auth/login';
import { registerHandler } from '../utils/auth/signUp';
import { persistentLoginHandler } from '../utils/auth/access';
import { refreshHandler } from '../utils/auth/refresh';

export const authRoute = express.Router();

authRoute.post('/api/auth/login', (req: Request, res: Response, next: NextFunction) => {
  loginHandler(req, res, next);
});

authRoute.post('/api/auth/logout', (req: Request, res: Response, next: NextFunction) => {
  logoutHandler(req, res, next);
});

authRoute.post('/api/auth/signUp', (req: Request, res: Response, next: NextFunction) => {
  registerHandler(req, res, next);
});

authRoute.get('/api/auth/persistentLogin', (req: Request, res: Response, next: NextFunction) => {
  persistentLoginHandler(req, res, next);
});

authRoute.get('/api/auth/refresh', (req: Request, res: Response, next: NextFunction) => {
  refreshHandler(req, res, next);
});