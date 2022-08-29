const crud = require("./../../crud/index");
const tableName = "Orders";


async function getOrders() {
    return await crud.get(tableName);
};

async function getOrdersById(id) {
    return await crud.getById(tableName, id);
};

async function createOrders(data) {
    return await crud.save(tableName, false, data);
};

async function editOrders(data, id) {
    return await crud.save(tableName, id, data);
};

async function removeOrders(id) {
    return await crud.remove(tableName, id);
};


module.exports = {
    getOrders,
    getOrdersById,
    createOrders,
    editOrders,
    removeOrders
};