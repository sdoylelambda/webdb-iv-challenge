const express = require('express');
const helmet = require('helmet');

const recipeRouter = require('../recipes/recipe-router');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/recipes', recipeRouter);

// sanity check route
server.get('/', (req, res) => {
  res.status(200).json({ hello: 'World!' });
});

module.exports = server;