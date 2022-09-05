const crud = require("./../../crud/index");
const tableName = "Products";

/*
id
Name
Price
*/


async function getProducts() {
    return await crud.get(tableName);
};

async function getProductsById(id) {
    const products = await getProducts();

    for (let product of products) {
        if (product.id == id) {
            return await crud.getById(tableName, id);
        } else {
            console.log(product.id);
            return {
                Error: id + " not found!"
            };
        };
    };
};

async function createProducts(data) {
    if (!data.Name) {
        return {
            Error: "It's necessary to fill in the 'Name' field!"
        };
    };

    if (!data.Price) {
        return {
            Error: "It's necessary to fill in the 'Price' field!"
        };
    };

    return await crud.save(tableName, false, data);
};

async function editProducts(data, id) {
    const products = await getProducts();

    for (let product of products) {
        if (product.id == id) {
            return await crud.save(tableName, id, data);
        } else {
            return {
                Error: id + " not found!"
            };
        };
    };
};

async function removeProducts(id) {
    const products = await getProducts();

    for (let product of products) {
        if (product.id == id) {
            return await crud.remove(tableName, id);
        } else {
            return {
                Error: id + " not found!"
            };
        };
    };
};


module.exports = {
    getProducts,
    getProductsById,
    createProducts,
    editProducts,
    removeProducts
};