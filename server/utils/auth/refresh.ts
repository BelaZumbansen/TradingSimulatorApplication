import { Request, Response, NextFunction } from 'express'
import AppError from '../../services/appError';
import { findUser } from '../../services/user';
import { verifyJwt } from './jwt';
import jwt from 'jsonwebtoken'
import { signToken } from '../../services/user';

export const refreshHandler = async (
  req: Request,
  res: Response,
  next: NextFunction) => {

    try {
      
      const auth = req.cookies.refreshToken;

      if (!auth) {
        return next(new AppError('Missing Refresh Token', 401));
      }

      const verify = verifyJwt('refreshTokenSecretKey', auth);
      
      if (!verify) {
        return next(new AppError('Invalid or Expired Refresh Token', 401)); 
      } else {
        
        const payload : jwt.JwtPayload = verify;
        const email = payload.sub;

        if (!email) {
          return next(new AppError('Invalid Refresh Token Payload', 401)); 
        }

        const user = await findUser(email);

        if (!user) {
          return next(new AppError('No User exists for given ID', 401));
        }

        const { accessToken, refreshToken } = await signToken(user);

        // Send Response
        res
        .status(200)
        .cookie('accessToken', accessToken, {
          httpOnly: true,
        })
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
        })
        .json({ message: 'Refreshed Access Token Successfully' });
      }
    } catch (err:any) {
      next(err);
    }
  }