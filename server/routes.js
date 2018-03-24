const router = require('express').Router();
const requestHandler = require('./request-handler.js');

router.get('/list', requestHandler.getAllUsers);
router.post('/follow', requestHandler.addFollower);
router.post('/unfollow', requestHandler.removeFollower);

module.exports = router;
