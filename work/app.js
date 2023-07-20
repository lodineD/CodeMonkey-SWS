const mysql = require("mysql");
const express = require("express");
const app = express();


let connection = mysql.createConnection({
    host: 'my-database-01.cgt9kgv3zopt.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'adminpassword',
    database: 'WebAppDatabase',
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

app.get('/README.html', (req, res) => {
    res.status(200).send('0K');
})

app.use(express.static('../'));

app.listen(80, () => {
    console.log("Server is running on port 80");
});



