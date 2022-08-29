const crud = require("./../../crud/index");
const tableName = "Users";


async function getUsers() {
    return await crud.get(tableName);
};

async function getUsersById(id) {
    return await crud.getById(tableName, id);
};

async function createUsers(data) {
    return await crud.save(tableName, false, data);
};

async function editUsers(data, id) {
    return await crud.save(tableName, id, data);
};

async function removeUsers(id) {
    return await crud.remove(tableName, id);
};


module.exports = {
    getUsers,
    getUsersById,
    createUsers,
    editUsers,
    removeUsers
};