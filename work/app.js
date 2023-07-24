const mysql = require("mysql");
const express = require("express");
const app = express();
const fs = require("fs");

let connection = null;

connection = mysql.createConnection({
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

function database() {

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

}

function dataAPI() {
    app.get("/get-API", (req, res) => {
        // 读取本地 JSON 文件
        fs.readFile("../data/hello.txt", "utf8", (err, data) => {
            if (err) {
                console.log("Failed to read JSON file: " + err.message);
                res.status(500).json({ error: "Failed to fetch data from the JSON file" });
                return;
            }

            try {
                // 将 JSON 数据解析
                const jsonData = JSON.parse(data);
                res.json(jsonData);// 发送给客户端
            } catch (parseError) {
                console.log("Failed to parse JSON data: " + parseError.message);
                res.status(500).json({ error: "Failed to parse JSON data" });
            }
        });
    });
}


database();
// dataAPI();

// setInterval(database, 300000);

app.get('/README.html', (req, res) => {
    res.status(200).send('0K');
})

app.use(express.static('../'));

app.listen(80, () => {
    console.log("Server is running on port 80");
});



