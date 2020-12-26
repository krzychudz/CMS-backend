const { json } = require('body-parser');
const { join } = require('path');
const { traceDeprecation } = require('process');
const firebase = require('../firebase');

const productsCollection = "Products";

exports.createProduct = async (req, res) => {
    const userId = req.body.userId;
    const body = req.body;

    body.ownerId = userId;
    delete body['userId'];

    try {
        await firebase.firebaseDb.collection(productsCollection).add(body);
        res.status(201).json(body);
    } catch (error) {
        res.status(500).json(error); 
    }
};

exports.getProducts = async (req, res) => {
    try {
        const querySnapshot = await firebase.firebaseDb.collection(productsCollection).where("isPublished", "==", true).get();
        const productsResponse = querySnapshot.docs.map((document) => {
            return {productId: document.id, ...document.data()}
        });
        res.status(201).json(productsResponse);
    } catch (error) {
        res.status(500).json(error); 
    }
}

exports.getUserProducts = async (req, res) => {
    const { userId } = req.body;

    try {
        const querySnapshot = await firebase.firebaseDb.collection(productsCollection).where("ownerId", "==", userId).get();
        const productsResponse = querySnapshot.docs.map((document) => {
            return {productId: document.id, ...document.data()}
        });
        res.status(201).json(productsResponse);
    } catch (error) {
        res.status(500).json(error); 
    }
}

exports.getUserProduct = async (req, res) => {
    const userId = req.body.userId;
    const productId = req.params.product_id;

    try {
        const querySnapshot = await firebase.firebaseDb.collection(productsCollection).doc(productId).get();
        const data = querySnapshot.data();
        if (data === undefined || data === null) {
            res.status(404).json({"message": "Not found"})
        }
        data.productId = querySnapshot.id;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json(error); 
    }
}

exports.updateProduct = async (req, res) => {
    const userId = req.body.userId;
    const productId = req.params.product_id;
    const body = req.body;

    try {
       await firebase.firebaseDb.collection(productsCollection).doc(productId).update(body);
       res.status(201).json(body);
    } catch (error) {
       res.status(500).json(error); 
    }
}

exports.deleteProduct = async (req, res) => {
    const userId = req.body.userId;
    const productId = req.params.product_id;

    try {
        await firebase.firebaseDb.collection(productsCollection).doc(productId).delete();
        res.status(201).json({"message": `Item ${productId} has been removed`});
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.findProduct = (req, res) => {
    var query = req.query.query;
}