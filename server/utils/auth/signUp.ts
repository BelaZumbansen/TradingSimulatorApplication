import { Request, Response, NextFunction } from 'express'
import { CreateUserCredentials, createUser, signToken } from '../../services/user'
import AppError from '../../services/appError'

// Handle Register Request
export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction ) => {

    try {

      // Parse Request Payload
      const createCredentials : CreateUserCredentials = {
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        email: req.body.email,
        password: req.body.password,
      };

      // Attempt to create a new User
      const user = await createUser(createCredentials);

      if (!user) {
        return next(new AppError('User with this email already exists.', 401));
      }

      // Generate an Access Token and Refresh Token for this User Session
      const { accessToken, refreshToken } = await signToken(user);

      // Send Response with Tokens
      res
      .status(200)
      .cookie('accessToken', accessToken, { httpOnly: true })
      .cookie('refreshToken', refreshToken, { httpOnly: true })
      .json({ user: user }); 
    } catch (err : any) {
      next(err);
    }
  }
