const { json } = require('body-parser');
const firestoreDb = require('../firebase');


exports.createProduct = (req, res) => {
    firestoreDb.collection('blog-posts').doc("test").set({
        "test": "test"
    }).then((val) => {
        res.status(201).json(val);
    });
};

exports.getProducts = (req, res) => {

}

exports.getUserProducts = (req, res) => {
    const userId = req.params.user_id;
}

exports.getUserProduct = (req, res) => {
    const userId = req.params.user_id;
    const postId = req.params.post_id;
}

exports.updateProduct = (req, res) => {
    const userId = req.params.user_id;
    const postId = req.params.post_id;
}

exports.deleteProduct = (req, res) => {
    const userId = req.params.user_id;
    const postId = req.params.post_id;
}