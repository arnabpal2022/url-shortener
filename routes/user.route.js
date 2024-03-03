const express = require('express');
const {handleGenerateShortURL} = require('../controllers/user.controller')

const router = express.Router();

router.post('/', handleGenerateShortURL)


module.exports = router