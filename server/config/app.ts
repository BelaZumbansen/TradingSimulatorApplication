import express, { Express, Request, Response } from 'express';

class App {

  public app: express.Application;
  public bcrypt = require('bcrypt')

  constructor() {
    this.app = express()
  }
}

export default new App().app;