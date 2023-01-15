import app from './config/app'
import express, {Express, Request, Response} from 'express'
import * as dotenv from 'dotenv'

// Set Up
dotenv.config();

const PORT = process.env.PORT || 3001;

const path = require('path');

app.use(express.static(path.resolve(__dirname, '../client/build')))

app.get('/api', (req: Request, res: Response) => {
  console.log('Received api request.');
  res.json({ message : "Hello from Server" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});