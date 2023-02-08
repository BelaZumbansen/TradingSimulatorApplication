import { User } from "../models/user";
import axios from "axios";
import * as portfolio_service from './portfolio'
import * as log_service from './transactionLog'
const config = require('../config')

export const execute_daily_trades = async (user : User, tickers : Array<String>) => {

    const portfolio = await portfolio_service.getPortfolioById(user.portfolioId);
    const log       = await log_service.getTransactionLogById(user.logId);


    axios.post(`${config.robo_trader.url}/trading_day/`,
    {
        tickers: tickers,
        positions: portfolio,
        logs: log,
        balance: user.balance
    });
}
