const { json } = require('body-parser');
const firestoreDb = require('../firebase');


exports.createBlogPost = (req, res) => {
    firestoreDb.collection('blog-posts').doc("test").set({
        "test": "test"
    }).then((val) => {
        res.status(201).json(val);
    });
};

exports.getPosts = (req, res) => {

}

exports.getUserPosts = (req, res) => {
    const userId = req.params.user_id;
}

exports.getUserPost = (req, res) => {
    const userId = req.params.user_id;
    const postId = req.params.post_id;
}

exports.updatePost = (req, res) => {
    const userId = req.params.user_id;
    const postId = req.params.post_id;
}

exports.deletePost = (req, res) => {
    const userId = req.params.user_id;
    const postId = req.params.post_id;
}