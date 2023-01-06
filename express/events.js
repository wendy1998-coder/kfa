const express = require('express');
const mysql = require("mysql");
const {config} = require("dotenv");

function getConnection() {
    config();

    console.log(process.env.database_url)
    console.log(process.env.database_user)
    console.log(process.env.database_name)

    const connection = mysql.createConnection({
        host     : process.env.database_url,
        user     : process.env.database_user,
        password : process.env.database_password,
        database : process.env.database_name
    });

    connection.connect();

    return connection
}

function createRouter() {
    const router = express.Router();

    // the routes are defined here
    router.get("/test", (req, res) => {
        res
            .status(200)
            .json({message: 'Endpoint is working' });
    });

    router.get('/event', function (req, res, next) {
        let connection = null;
        try {
            connection = getConnection()
            connection.query(
                "SELECT * From Furniture_information",
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