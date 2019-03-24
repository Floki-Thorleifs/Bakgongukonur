const express = require('express');
const { requireAuth, requireAdminAuth } = require('../auth');

const router = express.Router();

const {
  chatRoute,
  postQuestionRoute,
  postReplyRoute,
} = require('./chat/chat');

const {
  getData,
  setData,
} = require('./indexUtils');

const {
  adminRoute,
  adminPostRoute,
} = require('./admin/admin');

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}


async function indexPostRoute(req, res) {
  const { bloodTest } = req.body;
  const userID = req.user.id;

  const result = await setData(bloodTest, userID);

  return res.json(result);
}

async function indexRoute(req, res) {
  const userID = req.user.id;

  const data = await getData(userID);
  
  res.json(data);
}

router.get('/', requireAuth, catchErrors(indexRoute));
router.post('/', requireAuth, catchErrors(indexPostRoute));

router.get('/chat', requireAuth, catchErrors(chatRoute));
router.post('/chat/question', requireAuth, catchErrors(postQuestionRoute));
router.post('/chat/reply', requireAuth, catchErrors(postReplyRoute));

router.get('/admin', requireAdminAuth, catchErrors(adminRoute));
router.post('/admin', requireAdminAuth, catchErrors(adminPostRoute));


module.exports = router;
