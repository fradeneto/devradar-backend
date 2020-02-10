require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

express = require("express");

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.database();
    this.routes();
  }

  middlewares() {
    const cors = require("cors");
    this.express.use(express.json())
    this.express.use(
      cors({
        origin: "*"
      })
    );
  }

  database() {
    const mongoose = require('mongoose');
    const mongooseConfig = require('./config/database');
    mongoose.connect(mongooseConfig.uri, mongooseConfig.options);
  }

  routes() {
    this.express.use(require("./routes.js"));
  }

}

module.exports = new AppController().express;
