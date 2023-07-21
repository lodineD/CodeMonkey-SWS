const mysql = require("mysql");
const express = require("express");
const app = express();

let connection = null; // 将连接对象定义在全局作用域中

function fetchDataAndCloseConnection() {
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

        connection.query("SELECT latitude, longitude, car_num FROM car", (error, results) => {
            if (error) {
                console.log("select failed: " + error.message);
                return;
            }

            // 关闭数据库连接
            connection.end();

            // 处理数据，这里可以将数据传递给call_db.js或其他地方
            const data = results;
            console.log(data);
        });
    });
}

// 初始执行一次
fetchDataAndCloseConnection();

// 每10秒执行一次
setInterval(fetchDataAndCloseConnection, 10000);

app.get('/README.html', (req, res) => {
    res.status(200).send('0K');
});

app.use(express.static('../'));

app.listen(80, () => {
    console.log("Server is running on port 80");
});
