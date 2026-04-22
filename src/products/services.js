const { ObjectId } = require('mongodb');

const { Database } = require('../database/index.js');
const { ProductsUtils } = require('./utils.js');
const COLLECTION = 'products'

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();// devuelve todos los datos en forma de arreglo
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({ _id: new ObjectId(id) }); // devuelve los datos del id
}

const create = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId
}

const generateReport = async (name, res) => {
    let product = await getAll();
    ProductsUtils.excelGenerator(product, name, res);
}

// update 
const update = async (id, product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: product }
    );
    return result.modifiedCount > 0;
}
// delete

const deleteProduct = async (id) => {
    const collection = await Database(COLLECTION);
    let result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
}

module.exports.ProductsService = {
    getAll,
    getById,
    create,
    update,
    deleteProduct,
    generateReport
}

