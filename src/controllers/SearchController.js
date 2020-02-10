const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

class SearchController {
  
  // Search Devs 10km
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;
    
    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    return res.status(200).json(devs);
  }

}

module.exports = new SearchController();
