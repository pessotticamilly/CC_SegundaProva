const { async } = require('@firebase/util');
const { save, get, getById, remove } = require('../../crud/index');

const usersHandler = require("../Users/users.handler");

const getOrders = async () => {
    const orders = await get("Orders");
    return orders;
}

const getUserOrders = async (id) => {
    const userOrders = (await getOrders()).filter(order => order.userId === id);
    return userOrders;
}

const closeOrder = async (id) => {
    const orderProductsHandler = require("../OrderProducts/orderProducts.handler");
    const order = (await getOrders()).find(e => e.id === id);
    if(!order){
        return {"Error": "Order not found!"}
    }

    const orderToClose = await getOrderById(id);
    if(!(await orderProductsHandler.getOrderProducts()).find(e => e.orderId === id)){
        return {"Error": "The order cannot be closed without having items in it"}
    }
    delete orderToClose.id;
    orderToClose.status = "closed";
    const orderClosed = await saveOrders(id, orderToClose);
    return { "OrderClosed": orderClosed.id };
}

const saveOrders = async (id, newOrder = { number: 0, userId: "", status: "" }) => {
    
    if (id) {
        const order = (await getOrders()).find(e => e.id === id);
        if (!order) {
            return { "Error": "Order not found!" }
        }
        return await save("Orders", id, newOrder)
    } else {

        if (Object.keys(newOrder).length != 1) {
            return { "Error": `Invalid fields were inserted. Fields required: userId` }
        }
    
        if (!newOrder.userId) {
            return { "Error": "Missing userId field" };
        }
    
        if (typeof newOrder.userId != "string") {
            return { "Error": `On field userId, expect type string, but received: ${typeof newOrder.price}` }
        }
    
        const user = (await usersHandler.getUsers()).find(e => e.id === newOrder.userId);
        if (!user) {
            return { "Error": "User not found!" }
        }

        const orders = await getOrders();
        const openedOrder = orders.find(e => {
            if (e.status === "open" && e.userId === newOrder.userId) return e
        });

        if (openedOrder != undefined) {
            return { "Error": `The user already has an open order, close it before start a new one`, "Open order ID": `${openedOrder.id}` }
        }

        const ordersCount = orders.filter(e => e.userId === newOrder.userId)
        newOrder.number = ordersCount.length + 1;
        newOrder.status = "open";

        return await save("Orders", null, newOrder)
    }
}

const deleteOrders = async (id) => {
    const order = (await getOrders()).find(e => e.id === id);
    if (!order) {
        return { "Error": "Order not found!" }
    }
    return await remove("Orders", id);
}

const getOrderById = async (id) => {
    const products = (await getOrders()).filter(e => e.id === id);
    if (products.length === 0) {
        return { "Error": "Order not found!" }
    }
    return await getById("Orders", id);
}

module.exports = {
    getOrders,
    getOrderById,
    getUserOrders,
    saveOrders,
    deleteOrders,
    closeOrder,
}