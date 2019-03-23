const { query } = require('../../db');

async function addQuestion(question, userID) {
    const q = `
        INSERT INTO
        questions (question, userid)
        VALUES ($1, $2)
        RETURNING *
    `;

    const result = await query(q, [question, userID]);

    return result.rows[0];
}

async function addReply(comment, questionID, userID) {
    const q = `
        INSERT INTO
        comments (comment, questionid, userid)
        VALUES ($1, $2, $3)
        RETURNING *
    `;

    const result = await query(q, [comment, questionID, userID]);

    return result.rows[0];
}

async function getQuestionsReplies() {
    const q = `
        SELECT * FROM
        questions
        ORDER BY created DESC
    `;
    let questions = await query(q);
    questions = questions.rows;

    for (let i = 0; i < questions.length; i++) {
        const q2 = `
            SELECT * FROM
            comments
            WHERE questionid = $1
        `;
        const result = await query(q2, [questions[i].id]);
        const comments = result.rows;
        questions[i].comments = comments;
    }

    return questions;
}

module.exports = {
    addQuestion,
    addReply,
    getQuestionsReplies,
}