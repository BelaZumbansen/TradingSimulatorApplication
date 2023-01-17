import { Request, Response } from 'express'
import { authenticateLogin, retrieveByEmail } from '../models/user';
import { checkAuthToken } from '../services/jwt_authentication';
import { User } from '../models/user';


export function attemptToLogin(req: Request, res: Response) {

  const token = req.headers["authorization"];

  if (token) {
  
    checkAuthToken(token)
    .then(user_email => {

      if (user_email) {
        
        retrieveByEmail(user_email, token)
        .then(user => {

          if (user) {
            res.json(user);
          }
          return;
        })
      } 
    });
  } else{

    const userEmail = req.body.email;
    const userPassword = req.body.password;

    if (userEmail && userPassword)  {
      authenticateLogin(userEmail, userPassword)
      .then(user => {

        if (user) {
          res.json(user);
        }
        return;
      });
    }
  }
}