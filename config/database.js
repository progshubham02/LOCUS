var mysql = require('mysql');
const util = require("util");

const pool=mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "",
    database:"locus",
    connectionLimit: 100,
});

const getQuery = (query, params = null) => {
    return new Promise((resolve, reject) => {

        if(params === null) {
            pool.query(query, (err,results) => {
                if(err) reject(err);
        
                resolve(results);
            });
        }

        else {
            // console.log(query)
            pool.query(query, params, (err,results) => {
                if(err) reject(err);

                resolve(results);
            });
        }
    });
}

module.exports = {
    getQuery
}
