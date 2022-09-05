const crud = require("./../../crud/index");
const tableName = "OrdersProducts";
const productsHandler = require("./../Products/products.handler");
const ordersHandler = require("./../Orders/orders.handler");

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
    if (!data.ProductId) {
        return {
            Error: "It's necessary to fill in the 'ProductId' field!"
        };
    };

    let product = (await productsHandler.getProducts()).find(e => e.id == data.ProductId);

    if (product == undefined) {
        return {
            Error: `Product Id '${data.ProductId}' not found!`
        };
    };

    if (!data.Quantity) {
        return {
            Error: "It's necessary to fill in the 'Quantity' field!"
        };
    };

    if (!data.OrderId) {
        return {
            Error: "It's necessary to fill in the 'OrderId' field!"
        };
    };

    let order = (await ordersHandler.getOrders()).find(e => e.id == data.OrderId);

    if (order == undefined) {
        return {
            Error: `Order Id '${data.OrderId}' not found!`
        };
    };

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