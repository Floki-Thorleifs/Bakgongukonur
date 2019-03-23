const {
    addQuestion,
    getQuestionsReplies,
    addReply,
} = require('./chatUtils');



async function chatRoute(req, res) {
    const result = await getQuestionsReplies();
    console.log(result);

    return res.json(result);
}

async function postQuestionRoute(req, res) {
    const { question } = req.body;
    const user = req.user;

    const result = await addQuestion(question, user.id);
    return res.status(201).json(result);
}

async function postReplyRoute(req, res) {
    const { id , reply } = req.body;
    const user = req.user;

    const result = await addReply(reply, id, user.id);
    return res.status(201).json(result);
}

module.exports = {
    chatRoute,
    postQuestionRoute,
    postReplyRoute,
}