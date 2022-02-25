const express = require('express');

//Criar e adicionar rotas

const neo = require('./database');

const database = require('./database');

const routes = express.Router();


//Rotas de usuario
//routes.get('/users',neo.search);
routes.post('./addusers',neo.add);
routes.post('/amizade',neo.matche);
routes.delete('/deleteusers/:cpf', neo.delet);

module.exports = routes;