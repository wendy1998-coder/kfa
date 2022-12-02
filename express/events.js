const express = require('express');
const fs = require('fs');
const path = require("path")
const mysql = require("mysql");
const viewFile = "view.sql";
let viewSql;

function readViewSql() {
    fs.readFile(path.resolve(__dirname, viewFile),
        'utf8', function(err, data){
        if (err !== undefined && err !== null) {
            console.log(err)
        }
        viewSql = data;
    });

    console.log('readFile called');
}

function getConnection() {
    const connection = mysql.createConnection({
        host     : env.lookup("database_url"),
        user     : env.lookup("database_user"),
        password : env.lookup("database_password"),
        database : env.lookup("database_user")
    });

    connection.connect();

    return connection
}
function createRouter() {
    const router = express.Router();

    console.log(viewSql)
    if (viewSql === undefined) {
        readViewSql();
    }
    // the routes are defined here
    router.get('/event', function (req, res, next) {
        let connection = null;
        try {
            connection = getConnection()
            connection.query(
                viewSql,
                (error, results) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({status: 'error'});
                    } else {
                        res.status(200).json(results);
                    }
                }
            );
        } catch (e) {
            console.log(e)
        } finally {
            if (connection !== null) {
                connection.end()
            }
        }
    });

    return router;
}

module.exports = createRouter;