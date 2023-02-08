import { TransactionLog, ITransactionLog, TransactionLogModel } from "../models/transactionLog";

export const createTransactionLog = async (userEmail : string) => {

    const existingLog = await TransactionLogModel.findOne({user : userEmail});

    if (existingLog) {
        // TODO send appropriate error
        return null;
    }

    const logDoc = new TransactionLogModel({
        user: userEmail,
        log: []
    });

    await logDoc.save();

    return logDoc._id;
}

export const getTransactionLogById = async (id : string) => {

    const transactionLogDoc = await TransactionLogModel.findById(id);

    if (!transactionLogDoc) {
        return null;
    }

    return new TransactionLog(transactionLogDoc);
}

export const getTransactionLogByUser = async (email : string) => {

    const transactionLogDoc = await TransactionLogModel.findOne({user : email});

    if (!transactionLogDoc) {
        return null;
    }

    return new TransactionLog(transactionLogDoc);
}