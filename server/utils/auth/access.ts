import { Request, Response, NextFunction } from 'express'
import AppError from '../../services/appError';
import { findUser } from '../../services/user';
import { verifyJwt } from './jwt';
import jwt from 'jsonwebtoken'
import { signToken } from '../../services/user';

export const persistentLoginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction) => {

    try {

      console.log(req);
      const auth = req.cookies['accessToken'];

      console.log(auth);

      if (!auth) {
        return next(new AppError('Missing Authorization Token', 401));
      }

      const verify = verifyJwt('accessTokenSecretKey', auth);
     
      if (!verify) {
        return next(new AppError('Invalid or Expired Access Token', 401)); 
      } else {

        const payload : jwt.JwtPayload = verify;
        const email = payload.sub;

        if (!email) {
          return next(new AppError('Invalid Access Token Payload', 401)); 
        }

        const user = await findUser(email);

        if (!user) {
          return next(new AppError('No User exists for given ID', 401));
        }

        res
        .status(200).json({
          user,
        });
      }
    } catch (err:any) {
      res.status(401);
      res.json({message: 'Failed'});
    }
  }

export const authorizeAPICall = async (
  req: Request,
  res: Response,
  next: NextFunction) => {

    try {

      const auth = req.headers ? req.headers.authorization : null;

      if (!auth) {
        return next(new AppError('Missing Authorization Token', 401));
      }
      
      const verify = verifyJwt('accessTokenSecretKey', auth);
      
      if (!verify) {
        return next(new AppError('Invalid or Expired Access Token', 401)); 
      } else {
        
        const payload : jwt.JwtPayload = verify;
        const email = payload.sub;

        if (!email) {
          return next(new AppError('Invalid Access Token Payload', 401)); 
        }

        const user = await findUser(email);

        if (!user) {
          return next(new AppError('No User exists for given ID', 401));
        }
      }
    } catch (err:any) {
      next(err);
    }

    return true;
  }