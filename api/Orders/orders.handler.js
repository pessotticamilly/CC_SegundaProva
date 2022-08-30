const crud = require("./../../crud/index");
const tableName = "Orders";

/*
id
Number
UserId
Status
*/


async function getOrders() {
    return await crud.get(tableName);
};

async function getOrdersById(id) {
    const orders = await getOrders();

    for (let order of orders) {
        if (order.id == id) {
            return await crud.getById(tableName, id);
        } else {
            return {
                Error: id + " not found!"
            };
        };
    };
};

async function createOrders(data) {
    if (!data.Name) {
        return {
            Error: "It's necessary to fill in the 'Name' field!"
        };
    } else if (!data.Status) {
        return {
            Error: "It's necessary to fill in the 'Price' field!"
        };
    } else {
        return await crud.save(tableName, false, data);
    };
};

async function editOrders(data, id) {
    const orders = await getOrders();

    for (let order of orders) {
        if (order.id == id) {
            return await crud.save(tableName, id, data);
        } else {
            return {
                Error: id + " not found!"
            };
        };
    };
};

async function removeOrders(id) {
    const orders = await getOrders();

    for (let order of orders) {
        if (order.id == id) {
            return await crud.remove(tableName, id);
        } else {
            return {
                Error: id + " not found!"
            };
        };
    };
};


module.exports = {
    getOrders,
    getOrdersById,
    createOrders,
    editOrders,
    removeOrders
};