const express = require('express');

const { UsersController } = require('./controller.js');

const router = express.Router();

module.exports.UsersAPI = (app) => {
    router
        .get('/', UsersController.getUsers)
        .get('/:id', UsersController.getuser)
        .post('/', UsersController.createUsers)
        .put('/:id', UsersController.updateUsers)
        .delete('/:id', UsersController.deleteUsers)
    // update 
    // delete 

    app.use('/api/users', router);
}