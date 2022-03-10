const router = require('express').Router();
const verify = require('./verifyToken');


router.get('/', verify, (req, res) => {
    res.redirect('../../client/src/Components/Home');
    console.log('Home');
});

module.exports = router;