const createdError = require('http-errors');
const debug = require('debug')('app:module-users-controller');

const { UsersService } = require('./services.js');
const { Response } = require('../common/response.js');

module.exports.UsersController = {
    getUsers: async (req, res) => {
        try {
            let users = await UsersService.getAll();
            Response.success(res, 200, 'Lista de usuarios', users);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    getuser: async (req, res) => {
        try {
            const { params: { id } } = req;
            let users = await UsersService.getById(id);
            if (!users) {
                Response.error(res, new createdError.NotFound());
            } else {
                Response.success(res, 200, `Usuario ${id}`, users);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }

    },
    createUsers: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createdError.BadRequest());
            } else {
                const insertedId = await UsersService.create(body);
                Response.success(res, 201, 'Usuario agregado', insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    //upadate
    updateUsers: async (req, res) => {
        try {
            const { params: { id } } = req;
            let { body: updatedProduct } = req;
            let result = await UsersService.update(id, updatedProduct);
            if (!result) {
                Response.error(res, new createdError.NotFound());
            } else {
                Response.success(res, 200, 'Usuario actualizado', result);
            }
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    },

    deleteUsers: async (req, res) => {
        try {
            const { params: { id } } = req;
            let result = await UsersService.deleteProduct(id);
            if (!result) {
                Response.error(res, new createdError.NotFound());
            } else {
                Response.success(res, 200, 'Usuario eliminado', result);
            }
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    }
};



