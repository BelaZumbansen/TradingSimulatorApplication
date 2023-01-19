import app from './config/app';
import express, {Express, Request, Response} from 'express'
import * as dotenv from 'dotenv'
import { authRoute } from './routes/authRouter'
import mongoose from 'mongoose';

// Set Up
dotenv.config();

const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGODB_URI ?? '');
mongoose.set('strictQuery', true);

export const routes = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/', routes);
routes.use(authRoute)

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

