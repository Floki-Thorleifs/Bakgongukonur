const { query } = require('../db');



function pad(n) {
    return n<10 ? '0'+n : n;
}

async function getData(userID) {
    const q = `
        SELECT * FROM
        results
        WHERE userid = $1
        ORDER BY
        created DESC
    `;
    const result = await query(q, [userID]);
    const bloodTests = result.rows;
    
    let dateArr = [];
    
    for (let i = 0; i < bloodTests.length; i++) {
        const timestamp = bloodTests[0].created;
        const date = timestamp.getDate();
        const month = timestamp.getMonth();
        const year = timestamp.getFullYear();
        const ddmmyyyy = pad(date) + "-" + pad(month + 1) + "-" + year;
        let index = -1;
        for (let j = 0; j < dateArr.length; j++) {
            if (dateArr[j].date === ddmmyyyy) {
                index = j;
                j = dateArr.length;
            }
        }
        if (index === -1) {
            dateArr.push({
                date: ddmmyyyy,
                bloodtests: [bloodTests[i]],
            })
        } else {
            dateArr[index].bloodtests.push(bloodTests[i]);
        }
    }

    return dateArr;
}

async function setData(bloodTest, timestamp, userID) {
    const q = `
        INSERT INTO
        results (result, created, userid)
        VALUES ($1, $2, $3)
        RETURNING *
    `;

    const result = await query(q, [bloodTest, timestamp, userID]);
    return result.rows[0];
}

module.exports = {
    getData,
    setData,
}