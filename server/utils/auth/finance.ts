import { Request, Response, NextFunction } from 'express'
import { loadFunds, withdrawFunds } from '../../services/user'

// Handle Alter Funds API Request
export const alterFundsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction ) => {

        try {

            const load = req.headers.load;

            // Parse Fields
            const email = req.body.email;
            const funds = parseFloat(req.body.funds)

            let user = null;

            if (load === 'True') {
                user = await loadFunds(email, funds);
            } else {
                user = await withdrawFunds(email, funds);
            }

            if (user) {
                res
                .status(200)
                .json({ user : user });
            }
        } catch (err : any) {
            next(err);
        }
    }
