const express = require('express');
const router = express.Router();
const { isLoggedIn } = require("../middleware/authToken");
const {
  getArticles,
  getVideos,
  getPodcasts
} = require('../controllers/resourceController');

router.get('/articles',isLoggedIn, getArticles);
router.get('/videos',isLoggedIn, getVideos);
router.get('/podcasts',isLoggedIn, getPodcasts);

module.exports = router;
