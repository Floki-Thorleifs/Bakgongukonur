require('dotenv').config();

const fs = require('fs');
const util = require('util');
// const faker = require('faker');

const { query } = require('./db');

const connectionString = process.env.DATABASE_URL;
console.log(connectionString)

const readFileAsync = util.promisify(fs.readFile);

async function main() {
  console.info(`Set upp gagnagrunn á ${connectionString}`);
  // droppa töflu ef til
  await query('DROP TABLE IF EXISTS results');
  await query('DROP TABLE IF EXISTS comments');
  await query('DROP TABLE IF EXISTS questions');
  await query('DROP TABLE IF EXISTS users');
  await query('DROP TABLE IF EXISTS docs');
  console.info('Töflum eytt');

  // búa til töflur út frá skema
  try {
    const createTable = await readFileAsync('./sql/schema.sql');
    await query(createTable.toString('utf8'));
    console.info('Töflur búnar til');
  } catch (e) {
    console.error('Villa við að búa til töflur:', e.message);
    return;
  }

  // bæta færslum við töflur

  try {
    const insert = await readFileAsync('./sql/insert.sql');
    await query(insert.toString('utf8'));
    console.info('Gögnum bætt við í töflur');
  } catch (e) {
    console.error('Villa við að bæta gögnum við:', e.message);
  }
}



main().catch(err => {
  console.error(err);
});
