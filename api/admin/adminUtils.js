const { query } = require('../../db');
const { getData } = require('../indexUtils');

async function getClients(adminID) {
    const q = `
        SELECT * FROM
        users
        WHERE docid = $1
    `;
    const result = await query(q, [adminID]);
    const clients = result.rows;

    for (let i = 0; i < clients.length; i++) {
        clients[i].dateArr = await getData(clients[i].id);
    }

    return clients;
}

async function createClient(name, username, password, adminID) {
    const q = `
        INSERT INTO users
        (name, username, password, docid)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    const result = await query(q, [name, username, password, adminID]);
    return result.rows[0];
}

module.exports = {
    getClients,
    createClient,
}