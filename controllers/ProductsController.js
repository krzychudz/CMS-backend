const { json } = require('body-parser');
const { join } = require('path');
const { traceDeprecation } = require('process');
const firestoreDb = require('../firebase');
const idGenerator = require('../helpers/IdGenerator');


exports.createProduct = async (req, res) => {
    const userId = req.params.user_id;
    const body = req.body;
    const productId = idGenerator.generateUniqueFirestoreId();

    body.ownerId = userId;
    body.productId = productId;

    await firestoreDb.collection("Products").doc(productId).set(body);
    res.status(201).json(body);
  
};

exports.getProducts = async (req, res) => {
    const querySnapshot = await firestoreDb.collection("Products").where("isPublished", "==", true).get();

    querySnapshot.docs.forEach((document) => {
        console.log(document.data());
    });

    const productsResponse = querySnapshot.docs.map((document) => {
        return {productId: document.id, ...document.data()}
    });

    res.status(201).json(productsResponse);

}

exports.getUserProducts = async (req, res) => {
    const userId = req.params.user_id;

    const querySnapshot = await firestoreDb.collection("Products").where("ownerId", "==", userId).get();

    const productsResponse = querySnapshot.docs.map((document) => {
            return {productId: document.id, ...document.data()}
    });

    res.status(201).json(productsResponse);
}

exports.getUserProduct = (req, res) => {
    const userId = req.params.user_id;
    const productId = req.params.product_id;

    const querySnapshot = await firestoreDb.collection("Products").where("ownerId", "==", userId).where("productId", "==", productId).get();

    const productsResponse = querySnapshot.docs.map((document) => {
        return {...document.data()}
    });

    res.status(201).json(productsResponse);
}

exports.updateProduct = (req, res) => {
    const userId = req.params.user_id;
    const productiId = req.params.product_id;
}

exports.deleteProduct = (req, res) => {
    const userId = req.params.user_id;
    const productiId = req.params.product_id;
}

exports.findProduct = (req, res) => {
    var query = req.query.query;
}