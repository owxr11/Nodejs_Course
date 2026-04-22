const express = require('express');
const debug = require('debug')('app:main');

const { Config } = require('./src/config/index.js');
const { ProductsAPI } = require('./src/products/index.js');
const { UsersAPI } = require('./src/users/index.js');

const app = express();

app.use(express.json());

ProductsAPI(app);
UsersAPI(app);

// modulos 

app.listen(Config.port, () => {
    debug(`Servidor escuchando en el puerto ${Config.port}`)
})