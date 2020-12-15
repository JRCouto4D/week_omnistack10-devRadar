require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const { setupWebsocket } = require('./webSocket');

// INICIANDO APLICAÇÃO
const app = express();
const server = http.Server(app);
setupWebsocket(server);
app.use(express.json());
app.use(cors());

// CONECTANDO AO BANCO

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// ROTAS

app.use(routes);

// OUTROS

server.listen(process.env.PORT || 3333);