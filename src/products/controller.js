const createdError = require('http-errors');
const debug = require('debug')('app:module-products-controller');

const { ProductsService } = require('./services.js');
const { Response } = require('../common/response.js');

module.exports.ProductsController = {
    getProducts: async (req, res) => {
        try {
            let products = await ProductsService.getAll();
            Response.success(res, 200, 'Lista de productos', products);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    getProduct: async (req, res) => {
        try {
            const { params: { id } } = req;
            let product = await ProductsService.getById(id);
            if (!product) {
                Response.error(res, new createdError.NotFound());
            } else {
                Response.success(res, 200, `Producto ${id}`, product);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }

    },
    createProduct: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createdError.BadRequest());
            } else {
                const insertedId = await ProductsService.create(body);
                Response.success(res, 201, 'Producto agregado', insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    //upadate
    updateProduct: async (req, res) => {
        try {
            const { params: { id } } = req;
            let { body: updatedProduct } = req;
            let result = await ProductsService.update(id, updatedProduct);
            if (!result) {
                Response.error(res, new createdError.NotFound());
            } else {
                Response.success(res, 200, 'Producto actualizado', result);
            }
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    },

    deleteProduct: async (req, res) => {  // 👈 req primero, res segundo
        try {
            const { params: { id } } = req;
            let result = await ProductsService.deleteProduct(id); // 👈 await
            if (!result) {
                Response.error(res, new createdError.NotFound());
            } else {
                Response.success(res, 200, 'Producto eliminado', result);
            }
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    },
    generateReport: async (req, res) => {
        try {
            await ProductsService.generateReport('Inventario', res);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
};



