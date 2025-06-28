const express = require('express');
const router = express.Router();
const { shortenUrl, redirectToOriginal } = require('../controllers/urlController');

router.get('/', (req, res) => res.render('index'));
router.post('/shorten', shortenUrl);
router.get('/:shortCode', redirectToOriginal);

module.exports = router;
