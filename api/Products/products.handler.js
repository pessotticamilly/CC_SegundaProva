const crud = require("./../../crud/index");
const tableName = "Products";


async function getProducts() {
    return await crud.get(tableName);
};

async function getProductsById(id) {
    const users = await getProducts();

    for (let user of users) {
        if (user.id == id) {
            return await crud.getById(tableName, id);
        } else {
            console.log(user.id);
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
    } else if (!data.Price) {
        return {
            Error: "It's necessary to fill in the 'Price' field!"
        };
    } else {
        return await crud.save(tableName, false, data);
    };
};

async function editProducts(data, id) {
    const users = await getProducts();

    for (let user of users) {
        if (user.id == id) {
            return await crud.save(tableName, id, data);
        } else {
            console.log(user.id);
            return {
                Error: id + " not found!"
            };
        };
    };
};

async function removeProducts(id) {
    const users = await getProducts();

    for (let user of users) {
        if (user.id == id) {
            return await crud.remove(tableName, id);
        } else {
            console.log(user.id);
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