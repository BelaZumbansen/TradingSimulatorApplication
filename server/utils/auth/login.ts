import { Request, Response, NextFunction } from 'express'
import { LoginCredentials, findUser, signToken } from '../../services/user'
import { comparePassword } from '../../services/password';
import AppError from '../../services/appError'

export const loginHandler = async (
  req: Request, 
  res: Response,
  next: NextFunction ) => {

  try {

    const loginCredentials : LoginCredentials = {
      email: req.body.email,
      password: req.body.password,
    };

    const user = await findUser(loginCredentials.email);

    if (
      !user ||
      !(await comparePassword(loginCredentials.password, user.hashPass))
      ) {
        return next(new AppError('Invalid email or password', 401));
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
    .json({
      user: user
    }); 
  } catch (err : any) {
    next(err);
  }
}

