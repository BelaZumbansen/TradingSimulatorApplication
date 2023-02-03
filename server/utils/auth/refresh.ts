import { Request, Response, NextFunction } from 'express'
import AppError from '../../services/appError';
import { findUser } from '../../services/user';
import { verifyJwt } from './jwt';
import jwt from 'jsonwebtoken'
import { signToken } from '../../services/user';

// Handle Token Refresh Request
export const refreshHandler = async (
  req: Request,
  res: Response,
  next: NextFunction) => {

    try {
      
      // Attempt to parse Refresh Token
      const auth = req.cookies.refreshToken;

      if (!auth) {
        return next(new AppError('Missing Refresh Token', 401));
      }

      // Attempt to verify Refresh Token
      const verify = verifyJwt('refreshTokenSecretKey', auth);
      
      // Validate
      if (!verify) {
        return next(new AppError('Invalid or Expired Refresh Token', 401)); 
      } else {
        
        // Parse user Email from Token payload
        const payload : jwt.JwtPayload = verify;
        const email = payload.sub;

        // Validate Payload
        if (!email) {
          return next(new AppError('Invalid Refresh Token Payload', 401)); 
        }

        // Attempt to retrieve user by email identification
        const user = await findUser(email);

        if (!user) {
          return next(new AppError('No User exists for given ID', 401));
        }

        // Generate a new Access Token and Refresh Token
        const { accessToken, refreshToken } = await signToken(user);

        // Send Response
        res
        .status(200)
        .cookie('accessToken', accessToken, { httpOnly: true })
        .cookie('refreshToken', refreshToken, { httpOnly: true })
        .json({ message: 'Refreshed Access Token Successfully' });
      }
    } catch (err:any) {
      next(err);
    }
  }