import app from './config/app'
import express, {Express, Request, Response} from 'express'
import * as dotenv from 'dotenv'
import { userRoute } from './routes/userRouter';
import mongoose from 'mongoose';

// Set Up
dotenv.config();

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DB_CONN_STRING ?? '');

export const routes = express.Router();
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use('/', routes);
routes.use(userRoute);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

