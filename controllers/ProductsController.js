const { json } = require('body-parser');
const { join } = require('path');
const { traceDeprecation } = require('process');
const firebase = require('../firebase');
const nodemailer = require('../nodemailer');

const productsCollection = "Products";

exports.createProduct = async (req, res) => {
    const userId = req.body.userId;
    const body = req.body;

    try {
        let userData = await firebase.firebaseAuth.getUser(userId);

        let productData = {
            name: body.name,
            description: body.description,
            price: body.price,
            isPublished: body.isPublished,
            imageUrl: body.imageUrl,
            ownerId: userId,
            ownerEmail: userData.email
        }

        await firebase.firebaseDb.collection(productsCollection).add(productData);
        res.status(201).json(productData);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getProducts = async (req, res) => {
    try {
        const querySnapshot = await firebase.firebaseDb.collection(productsCollection).where("isPublished", "==", true).get();
        const productsResponse = querySnapshot.docs.map((document) => {
            return { productId: document.id, ...document.data() }
        });
        res.status(200).json(productsResponse);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getUserProducts = async (req, res) => {
    const { userId } = req.body;

    try {
        const querySnapshot = await firebase.firebaseDb.collection(productsCollection).where("ownerId", "==", userId).get();
        const productsResponse = querySnapshot.docs.map((document) => {
            return { productId: document.id, ...document.data() }
        });
        res.status(200).json(productsResponse);
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
            res.status(404).json({ "message": "Not found" });
        }
        if (data.ownerId !== userId) {
            res.status(401).json({ "message": "Unauthorized" });
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
        let isUserOwner = await isProductOwnedByUser(productId, userId);
        if (!isUserOwner) {
            res.status(401).json({ "message": "Unauthorized" });
        }
        await firebase.firebaseDb.collection(productsCollection).doc(productId).update(body);
        body.productId = productId;
        res.status(201).json(body);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.deleteProduct = async (req, res) => {
    const userId = req.body.userId;
    const productId = req.params.product_id;

    try {
        let isUserOwner = await isProductOwnedByUser(productId, userId);
        if (!isUserOwner) {
            res.status(401).json({ "message": "Unauthorized" });
        }
        await firebase.firebaseDb.collection(productsCollection).doc(productId).delete();
        res.status(201).json({ "removedId": productId });
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.sendEmail = async (req, res) => {
    const { userId, recEmail, subject, message } = req.body;
    try {
        let userData = await firebase.firebaseAuth.getUser(userId); 

        let htmlMessageTemplate = `<b>Witaj ${recEmail}</b> <br> Użytkownik ${userData.email} wysłał zapytanie odnośnie twojego produktu: <br> <br> <p><i>${message}</i></p>`;

        await nodemailer.mailService.sendMail({
            from: 'No-reply<shop.app@zohomail.eu>',
            to: recEmail,
            subject: subject,
            html: htmlMessageTemplate
        });
        res.status(200).json({ "message": "success" });
    } catch (error) {
        res.status(500).json(error);
    }
}

const isProductOwnedByUser = async (productId, userId) => {
    const querySnapshot = await firebase.firebaseDb.collection(productsCollection).doc(productId).get();
    const data = querySnapshot.data();
    if (data.ownerId !== userId) {
        return false;
    }

    return true;
}