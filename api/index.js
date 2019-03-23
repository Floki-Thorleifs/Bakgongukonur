const express = require('express');
const { requireAuth, requireAdminAuth } = require('../auth');

const router = express.Router();

const {
  chatRoute,
  postQuestionRoute,
  postReplyRoute,
} = require('./chat/chat');

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

function indexRoute(req, res) {
  console.log('gamli');
  return res.json({
    gamli: 'netti'
  });
}

router.get('/', indexRoute);

router.get('/chat', requireAuth, catchErrors(chatRoute));
router.post('/chat/question', requireAuth, catchErrors(postQuestionRoute));
router.post('/chat/reply', requireAuth, catchErrors(postReplyRoute));


module.exports = router;
