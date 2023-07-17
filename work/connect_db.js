const mysql = require("mysql");
const express = require("express");
const app = express();


// let axios = require("axios");

let connection = mysql.createConnection({
    host: 'car.cocfi12ed6lp.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'ycx030830',
    database: 'CAR',
});


connection.connect((error) => {
    if (error) {
        console.error("connect failed: " + error.stack);
        return;
    }
    console.log("connect success!");
});

app.get("/get-data", (req, res) => {
    connection.query("SELECT latitude, longitude, car_num FROM car", (error, results) => {
        if (error) {
            console.log("select failed: " + error.message);
            res.status(500).json({ error: "Failed to fetch data from the database" });
            return;
        }

        res.json(results);// 发送后客户端
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});



