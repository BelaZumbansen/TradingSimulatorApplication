import { Request, Response, NextFunction } from 'express'
import { CreateUserCredentials, createUser, signToken } from '../../services/user'
import { hashPassword } from '../../services/password';
import AppError from '../../services/appError'

export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction ) => {

    try {

      const createCredentials : CreateUserCredentials = {
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        email: req.body.email,
        password: req.body.password,
      };

      const user = await createUser(createCredentials);

      if (!user) {
        return next(new AppError('User with this email already exists.', 401));
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
      .json({ message: 'Registered Successfully' }); 
    } catch (err : any) {
      next(err);
    }
  }
