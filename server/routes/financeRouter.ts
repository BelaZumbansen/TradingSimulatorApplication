import express, { Request, Response, NextFunction } from 'express'
import { alterFundsHandler } from '../utils/auth/finance'

export const financeRoute = express.Router();

financeRoute.post('/api/user/balance', (req: Request, res: Response, next: NextFunction) => {
    alterFundsHandler(req, res, next);
});