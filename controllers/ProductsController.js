const { json } = require('body-parser');
const firestoreDb = require('../firebase');
const idGenerator = require('../helpers/IdGenerator');


exports.createProduct = (req, res) => {
    const userId = req.params.user_id;
    const body = req.body;
    const productId = idGenerator.generateUniqueFirestoreId();

    body.productId = productId;
    body.ownerId = userId;

    firestoreDb.collection("Products").doc(productId).set(
        body
    ).then(() => {
        res.status(201).json(body);
    });
};

exports.getProducts = (req, res) => {

}

exports.getUserProducts = (req, res) => {
    const userId = req.params.user_id;
}

exports.getUserProduct = (req, res) => {
    const userId = req.params.user_id;
    const productiId = req.params.product_id;
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