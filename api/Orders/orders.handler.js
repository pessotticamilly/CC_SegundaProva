const crud = require("./../../crud/index");
const tableName = "Orders";
const usersHandler = require("./../Users/users.handler");

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
    if (!data.UserId) {
        return {
            Error: "It's necessary to fill in the 'UserId' field!"
        };
    };

    const user = await (await usersHandler.getUsers()).find(e => e.id == data.UserId);

    if (user == undefined) {
        return {
            Error: `User Id '${data.UserId}' not found!`
        };
    };

    if (!data.Status) {
        return {
            Error: "It's necessary to fill in the 'Status' field!"
        };
    };

    if (data.Status != "Open") {
        return {
            Error: "You can only make an order if it is open!"
        };
    };

    let orders = await getOrders();

    for (let order of orders) {
        if (order.Status == "Open") {
            return {
                Error: "This user already has an open order!"
            };
        } else {
            return await crud.save(tableName, false, data);
        };
    };
};

async function editOrders(data, id) {
    const orders = await getOrders();

    for (let order of orders) {
        if (order.id == id) {
            if (data.Status == "Open") {
                return await crud.save(tableName, id, data);
            } else {
                return {
                    Error: "You can only edit an order if it is open!"
                };
            };
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