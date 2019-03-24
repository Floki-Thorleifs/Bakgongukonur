const bcrypt = require('bcrypt');

const {
    getClients,
    createClient,
} = require('./adminUtils');


async function adminRoute(req, res) {
    const adminID = req.user.id;

    const clients = await getClients(adminID);

    return res.json(clients);
}

async function adminPostRoute(req, res) {
    const {
        name,
        username,
        password,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 11);
    const adminID = req.user.id;

    const clients = await createClient(name, username, hashedPassword, adminID);
    return res.json(clients);
}

module.exports = {
    adminRoute,
    adminPostRoute,
}