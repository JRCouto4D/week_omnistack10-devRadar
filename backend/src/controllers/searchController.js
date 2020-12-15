const parseStringAsArray = require('../utils/parserStringAsArray');
const Dev = require('../models/dev');

module.exports = {
    async index(req, res){
        const { latitude, longitude, techs } = req.query;

        const techsArray = parseStringAsArray(techs);
        
        const devs = await Dev.find({
            techs: {
                $in: techsArray   //Se o dev tem as tecnologias que estão detro de:  
            },                   // ver mais em: https://docs.mongodb.com/manual/reference/operator/query/  
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },                     
        });

        return res.json({devs});
    }
}