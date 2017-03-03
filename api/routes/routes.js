const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/test', (req, res) => {
  res.send('api works');
});

module.exports = router;
