import { Request, Response, NextFunction } from 'express'
import { LoginCredentials, findUser, signToken } from '../../services/user'
import { comparePassword } from '../../services/password';
import AppError from '../../services/appError'

// Handle Logout API Request
export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
    
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({message : 'Logged Out'});
  }

// Handle Login API Request
export const loginHandler = async (
  req: Request, 
  res: Response,
  next: NextFunction ) => {

  try {

    // Parse Fields
    const email = req.body.email;
    const password = req.body.password;

    const user = await findUser(email);

    // Check credentials
    if (
      !user ||
      !(await comparePassword(password, user.hashPass))
      ) {
        return next(new AppError('Invalid email or password', 401));
    }

    // Generate an Access Token and a Refresh Token
    const { accessToken, refreshToken } = await signToken(user);

    // Configure Response with Authentication Tokens
    res
    .status(200)
    .cookie('accessToken', accessToken, { httpOnly: true })
    .cookie('refreshToken', refreshToken, { httpOnly: true })
    .json({ user: user }); 
  } catch (err : any) {
    next(err);
  }
}

