const crud = require("./../../crud/index");
const tableName = "Products";


async function getProducts() {
    return await crud.get(tableName);
};

async function getProductsById(id) {
    return await crud.getById(tableName, id);
};

async function createProducts(data) {
    return await crud.save(tableName, false, data);
};

async function editProducts(data, id) {
    return await crud.save(tableName, id, data);
};

async function removeProducts(id) {
    return await crud.remove(tableName, id);
};


module.exports = {
    getProducts,
    getProductsById,
    createProducts,
    editProducts,
    removeProducts
};