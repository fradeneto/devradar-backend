require('dotenv/config');

module.exports = {
  uri: process.env.URL_MONGODB,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
}