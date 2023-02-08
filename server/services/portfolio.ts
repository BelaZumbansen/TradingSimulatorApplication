import { model, Schema, Model, Document } from 'mongoose'
import { PortfolioModel, Portfolio, IPortfolio } from '../models/portfolio'

export const createPortfolio = async (userEmail : string) => {

    const existingPortfolio = await PortfolioModel.findOne({user: userEmail});

    if (existingPortfolio) {
        // TODO send appropriate error
        return null;
    }

    const portfolioDoc = new PortfolioModel({
        user: userEmail,
        portfolio: {}
    });

    await portfolioDoc.save();

    return portfolioDoc._id;
}

export const getPortfolioById = async (id : string) => {

    const portfolioDoc = await PortfolioModel.findById(id);

    if (!portfolioDoc) {
        return null;
    }

    return new Portfolio(portfolioDoc);
}

export const getPortfolioByUser = async (email : string) => {

    const portfolioDoc = await PortfolioModel.findOne({user : email});

    if (!portfolioDoc) {
        return null;
    }

    return new Portfolio(portfolioDoc);
}