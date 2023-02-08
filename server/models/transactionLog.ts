import { model, Schema, Model, Document } from 'mongoose'

export function instanceOfBuyTransaction(object : any) {

    return ('ticker' in object 
    && 'date' in object
    && 'amount' in object
    && 'buyPrice' in object)
}

export function sendToBuyTransaction(object : any) {

    let buyTransaction = <BuyTransaction>{}
    buyTransaction.ticker = object.ticker;
    buyTransaction.date   = object.date;
    buyTransaction.amount = object.amount;
    buyTransaction.buyPrice = object.buyPrice;

    return buyTransaction
}

export interface SellTransaction {
    ticker: string,
    date: string,
    amount: number,
    sellPrice: number,
    buyPrice: number,
    profit: number
}

export interface BuyTransaction {
    ticker: string,
    date: string,
    amount: number,
    buyPrice: number
}

export interface ITransactionLog extends Document {
    user: string;
    logs: Array<BuyTransaction | SellTransaction>;
}

const TransactionSchema : Schema = new Schema({
    user: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255
    },
    logs: {
        type: Array<BuyTransaction | SellTransaction>,
        required: true
    },
}, {
    strictQuery: true,
});

// Compile Transaction Log Model
export const TransactionLogModel : Model<ITransactionLog> = model<ITransactionLog>('TransactionLog', TransactionSchema)

export class TransactionLog {

    user: string;
    logs: Array<BuyTransaction | SellTransaction>;

    constructor(logDoc : ITransactionLog) {
        this.user = logDoc.user;
        this.logs = logDoc.logs;
    }
}