const Url = require('../models/Url');
const { nanoid } = require('nanoid');

exports.shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) return res.status(400).send('URL is required');

  const shortCode = nanoid(6);

  const newUrl = new Url({ shortCode, originalUrl });
  await newUrl.save();

  const fullShortUrl = `${req.protocol}://${req.get('host')}/${shortCode}`;
  res.render('result', { fullShortUrl });
};

exports.redirectToOriginal = async (req, res) => {
  const { shortCode } = req.params;

  const url = await Url.findOne({ shortCode });
  if (url) {
    return res.redirect(url.originalUrl);
  } else {
    return res.status(404).send('URL not found');
  }
};
