const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;
        
        let dev = await Dev.findOne({github_username});

        if (!dev) {

            const apiReponse = await axios.get(`https://api.github.com/users/${github_username}`);
                      
            const { name = login, avatar_url, bio } = apiReponse.data;
            
            const techsArray = parseStringAsArray(techs);
            
            const location = {
                type: "Point",
                coordinates: [longitude, latitude],
            }
            
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
            
        }
            
        return res.json(dev);
    }, 
    async uptade(req, res) {
        
        const devId = req.params.id;
        
        const { name, techs, latitude, longitude } = req.body;

        const dev = await Dev.findById({_id: devId});
        
        const techsArray = parseStringAsArray(techs);
        
        const coordinates = [longitude, latitude];
        
        dev.name = name;
        dev.techs = techsArray;
        dev.location.coordinates = coordinates;
        
        dev.save();
        
        return res.json(dev);
   
    },
    async destroy(req, res) {

        const devId = req.params.id;

        const dev = await Dev.findById({_id: devId});
 
        if (dev) {

            dev.remove();

            return res.json({messege: "Successfully deleted."});
        } else {
            return res.json({messege: "Dev not found."});
        }


    }
}