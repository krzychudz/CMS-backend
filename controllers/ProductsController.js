const { json } = require('body-parser');
const { join } = require('path');
const { traceDeprecation } = require('process');
const firebase = require('../firebase');

const productsCollection = "Products";

exports.createProduct = async (req, res) => {
    const userId = req.params.user_id;
    const body = req.body;
 
    body.ownerId = userId;

    await firebase.firebaseDb.collection(productsCollection).add(body);
    res.status(201).json(body);
  
};

exports.getProducts = async (req, res) => {
    const querySnapshot = await firebase.firebaseDb.collection(productsCollection).where("isPublished", "==", true).get();

    querySnapshot.docs.forEach((document) => {
        console.log(document.data());
    });

    const productsResponse = querySnapshot.docs.map((document) => {
        return {productId: document.id, ...document.data()}
    });

    res.status(201).json(productsResponse);

}

exports.getUserProducts = async (req, res) => {
    const { userId } = req.body;

    const querySnapshot = await firebase.firebaseDb.collection(productsCollection).where("ownerId", "==", userId).get();

    const productsResponse = querySnapshot.docs.map((document) => {
            return {productId: document.id, ...document.data()}
    });

    res.status(201).json(productsResponse);
}

exports.getUserProduct = async (req, res) => {
    const userId = req.body.userId;
    const productId = req.params.product_id;

    const querySnapshot = await firebase.firebaseDb.collection(productsCollection).doc(productId).get();

    const data = querySnapshot.data();
    
    if (data === undefined || data === null) {
        res.status(404).json({"message": "Not found"})
    }
    
    if (data.ownerId != userId) {
        res.status(401).json({"message:": "Unauthorized"});
    }

    data.productId = querySnapshot.id;

    res.status(201).json(data);
}

exports.updateProduct = async (req, res) => {
    const userId = req.body.userId;
    const productId = req.params.product_id;
    const body = req.body;

    try {
       await firebase.firebaseDb.collection(productsCollection).doc(productId).update(body);
    } catch (error) {
       res.status(500).json(error); 
    }

    res.status(201).json(body);
}

exports.deleteProduct = async (req, res) => {
    const userId = req.body.userId;
    const productId = req.params.product_id;

    try {
        await firebase.firebaseDb.collection(productsCollection).doc(productId).delete();
    } catch (error) {
        res.status(500).json(error);
    }

    res.status(201).json({"message": `Item ${productId} has been removed`});
}

exports.findProduct = (req, res) => {
    var query = req.query.query;
}