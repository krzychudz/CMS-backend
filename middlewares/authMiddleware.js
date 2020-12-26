const firebase = require('../firebase');

exports.verifyToken = async (req, res, next) => {
    const idToken = req.headers.authorization;
    console.log(req.headers)

    try {
        const decodedToken = await firebase.firebaseAuth.verifyIdToken(idToken);

        if (decodedToken) {
            req.body.userId = decodedToken.uid;
            return next();
        } else {
            return res.status(401).json({"message:": "Unauthorized"});
        }

    } catch (error) {
        return res.status(401).json({"message:": "Unauthorized"});
    }
}