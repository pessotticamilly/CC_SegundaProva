const crud = require("./../../crud/index");
const tableName = "Users";

/*
id
CPF
Name
Surname
*/


async function getUsers() {
    return await crud.get(tableName);
};

async function getUsersById(id) {
    const users = await getUsers();

    for (let user of users) {
        if (user.id == id) {
            return await crud.getById(tableName, id);
        } else {
            return {
                Error: id + " not found!"
            };
        };
    };
};

async function createUsers(data) {
    if (!data.Name) {
        return {
            Error: "It's necessary to fill in the 'Name' field!"
        };
    } else if (!data.Surname) {
        return {
            Error: "It's necessary to fill in the 'Surname' field!"
        };
    } else if (!data.CPF) {
        return {
            Error: "It's necessary to fill in the 'CPF' field!"
        };
    } else {
        return await crud.save(tableName, false, data);
    };
};

async function editUsers(data, id) {
    const users = await getUsers();

    for (let user of users) {
        if (user.id == id) {
            return await crud.save(tableName, id, data);
        } else {
            return {
                Error: id + " not found!"
            };
        };
    };
};

async function removeUsers(id) {
    const users = await getUsers();

    for (let user of users) {
        if (user.id == id) {
            return await crud.remove(tableName, id);
        } else {
            return {
                Error: id + " not found!"
            };
        };
    };
};


module.exports = {
    getUsers,
    getUsersById,
    createUsers,
    editUsers,
    removeUsers
};