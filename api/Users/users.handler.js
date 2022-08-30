const { fromString } = require("long");
const crud = require("./../../crud/index");
const tableName = "Users";


async function getUsers() {
    return await crud.get(tableName);
};

async function getUsersById(id) {
    return await crud.getById(tableName, id);
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
    }
};

async function editUsers(data, id) {
    return await crud.save(tableName, id, data);
};

async function removeUsers(id) {
    const users = await getUsers();

    console.log(users);

    for (let userId of users) {
        if (userId == id) {
            return await crud.remove(tableName, id);
        } else {
            console.log("User ID: " + userId);
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