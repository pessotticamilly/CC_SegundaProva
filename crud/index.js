const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, addDoc, query, where, getDocs, getDoc, deleteDoc } = require('firebase/firestore/lite');

const firebaseConfig = {
    apiKey: "AIzaSyB2T2vqssZMt6LWrYk9FYG05W5-CDzfl5g",
    authDomain: "pedido-camilly.firebaseapp.com",
    projectId: "pedido-camilly",
    storageBucket: "pedido-camilly.appspot.com",
    messagingSenderId: "641103259453",
    appId: "1:641103259453:web:55fd1bd1b46ee31c2c0754",
    measurementId: "G-5R9VE2CNE9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

async function save(tableName, id, data) {
    if (id) {
        const referenceEntity = await setDoc(doc(db, tableName, id), data);
        const savedData = {
            ...data,
            id: id,
        };
        return savedData;
    } else {
        const referenceEntity = await addDoc(collection(db, tableName), data);
        const savedData = {
            ...data,
            id: referenceEntity.id,
        };
        return savedData;
    };
};

async function get(tableName) {
    const tableRef = collection(db, tableName);
    const q = query(tableRef);
    const querySnapshot = await getDocs(q);
    const list = [];

    querySnapshot.forEach((doc) => {
        const data = {
            ...doc.data(),
            id: doc.id,
        };
        list.push(data);
    });
    return list;
};

async function getById(tableName, id) {
    const docRef = doc(db, tableName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return {
            message: `'${id}' not found!`
        };
    };
};

async function remove(tableName, id) {
    const data = await deleteDoc(doc(db, tableName, id));

    return {
        message: `'${id}' removed!`
    };
};


module.exports = {
    save,
    get,
    getById,
    remove
};