const express = require('express');

const { ProductsController } = require('./controller.js');

const router = express.Router();

module.exports.ProductsAPI = (app) => {
    router
        .get('/', ProductsController.getProducts)
        .get('/reporte', ProductsController.generateReport)
        .get('/:id', ProductsController.getProduct)
        .post('/', ProductsController.createProduct)
        .put('/:id', ProductsController.updateProduct)    // 👈 agrega /:id
        .delete('/:id', ProductsController.deleteProduct)
    // update 
    // delete 

    app.use('/api/products', router);
}