const crud = require("./../../crud/index");
const tableName = "OrdersProducts";

/*
id
ProductId
Quantity
OrderId
*/


async function getOrdersProducts() {
    return await crud.get(tableName);
};

async function getOrdersProductsById(id) {
    return await crud.getById(tableName, id);
};

async function createOrdersProducts(data) {
    return await crud.save(tableName, false, data);
};

async function editOrdersProducts(data, id) {
    return await crud.save(tableName, id, data);
};

async function removeOrdersProducts(id) {
    return await crud.remove(tableName, id);
};


module.exports = {
    getOrdersProducts,
    getOrdersProductsById,
    createOrdersProducts,
    editOrdersProducts,
    removeOrdersProducts
};