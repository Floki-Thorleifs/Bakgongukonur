const bcrypt = require('bcrypt');
const { query } = require('./db');

async function comparePasswords(password, hash) {
  const result = await bcrypt.compare(password, hash);

  return result;
}

async function findByUsername(username) {
  const q = 'SELECT * FROM users WHERE username = $1';

  const result = await query(q, [username]);

  if (result.rowCount === 1) {
    return result.rows[0];
  }

  return null;
}

async function findById(id) {
  if (!Number.isInteger(Number(id))) {
    return null;
  }

  const q = 'SELECT * FROM users WHERE id = $1';

  const result = await query(q, [id]);

  if (result.rowCount === 1) {
    return result.rows[0];
  }

  return null;
}

async function createUser(name, username, password, docid) {

  const hashedPassword = await bcrypt.hash(password, 11);

  const q = `
    INSERT INTO
      users (name, username, password, docid)
    VALUES
      ($1, $2, $3)
    RETURNING *`;

  const result = await query(q, [name, username, hashedPassword, docid]);

  return result.rows[0];
}

async function updateAdmin(id, admin) {
  if (!Number.isInteger(Number(id))) {
    return null;
  }

  const q = `
    UPDATE users
    SET admin = $1
    WHERE id = $2
    RETURNING *
  `;

  const result = await query(q, [admin, id]);

  return result.rows[0];
}

module.exports = {
  comparePasswords,
  findByUsername,
  findById,
  createUser,
  updateAdmin,
};