import { Request, Response } from 'express'
import { registerUser } from '../models/user';

export function attemptToSignUp(req: Request, res: Response) {

  const name = req.body.name;
  const email = req.body.email;
  const dateOfBirth : Date = req.body.dateOfBirth;
  const password = req.body.password;

  if (name && email && dateOfBirth && password) {

    registerUser(name, dateOfBirth, email, password)
    .then(user => {
      
      if (user) {
        res.json(user);
      }
    })
  }
}
