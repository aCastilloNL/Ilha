const express = require('express');
app = express();
const router = express.Router();
app.use(express.json());

const signUp = require('../controllers/signUp');
const signIn = require('../controllers/signIn');

router.post('/signUp', signUp);
router.post('/signIn', signIn);

module.exports = router;