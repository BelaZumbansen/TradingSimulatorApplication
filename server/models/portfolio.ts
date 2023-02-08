import { model, Schema, Model, Document } from 'mongoose'
import { BuyTransaction, instanceOfBuyTransaction, sendToBuyTransaction } from './transactionLog';

export interface IPortfolio extends Document {
    user: string;
    portfolio: { [key: string] : Array<BuyTransaction>}
}

// Define Portfolio Schema
const PortfolioSchema : Schema = new Schema({
    user: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        unique: true
    },
    portfolio: {
        type: Array<BuyTransaction>,
        required: true
    },
}, {
    strictQuery: true,
})

// Compile Portfolio Model
export const PortfolioModel : Model<IPortfolio> = model<IPortfolio>('Portfolio', PortfolioSchema);

export class Portfolio {

    user: string;
    portfolio: { [key: string] : Array<BuyTransaction>};

    constructor(portfolioDoc : IPortfolio) {
        this.user = portfolioDoc.user;

        const positionLs = portfolioDoc.portfolio;
        let portfolio : { [key: string] : Array<BuyTransaction>} = {}

        if (positionLs instanceof Array<BuyTransaction>) {

            positionLs.forEach( (position) => {

                if (instanceOfBuyTransaction(position)) {

                    const buyTransaction = sendToBuyTransaction(position)

                    if (buyTransaction.ticker in portfolio) {
                        portfolio[buyTransaction.ticker].push(buyTransaction)
                    } else {
                        portfolio[buyTransaction.ticker] = [buyTransaction]
                    }
                }
            })
        }
        this.portfolio = portfolioDoc.portfolio;
    }
}