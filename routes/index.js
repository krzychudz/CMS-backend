const app = require("../app");

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({status: 'status'});
});

module.exports = router;