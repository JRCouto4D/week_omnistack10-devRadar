const { Router } = require('express');
const routes = Router();
const devController = require('./controllers/devController');
const searchController = require('./controllers/searchController');

routes.get('/', (req, res) => {
    return res.json({ "mensagem": "HELLO OMNISTACK !!!"});
});

routes.post('/devs', devController.store);
routes.get('/devs', devController.index);
routes.get('/search', searchController.index);
routes.put('/devs/:id', devController.update);
routes.delete('/devs/:id', devController.destroyer);

module.exports = routes;