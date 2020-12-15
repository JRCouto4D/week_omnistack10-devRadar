const axios = require('axios');
const Dev = require('../models/dev');
const parseStringAsArray = require('../utils/parserStringAsArray');
const parseLocation = require('../utils/parseLocation');

const { findConnections, sendMessage } = require('../webSocket');

module.exports = {
    async index(req, res){
        const dev = await Dev.find();

        return res.json(dev);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev) {

            const response = await axios.get(`https://api.github.com/users/${github_username}`);
            
            const { name = login, avatar_url, bio } = response.data;
            
            const techsArray = parseStringAsArray(techs); 
            const location = parseLocation(latitude, longitude);
        
            dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location,
            });

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);

        }
    
        return res.json(dev);
    },

    async update(req, res) {
        const {name, bio, avatar_url, techs, latitude, longitude } = req.body;
        const arrayTechs = parseStringAsArray(techs);
        const location = parseLocation(latitude, longitude);
        const dev = await Dev.findByIdAndUpdate(req.params.id, {
            name,
            bio,
            avatar_url,
            techs: arrayTechs,
            location
        }, {new: true,});

        return res.json(dev);
    }, 

    async destroyer(req, res) {
        await Dev.findByIdAndRemove(req.params.id);

        return res.send();
    }
}