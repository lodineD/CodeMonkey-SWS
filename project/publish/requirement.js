let mysql = require("mysql");

let connection = mysql.createConnection({
    host: 'car.cocfi12ed6lp.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'ycx030830',
    database: 'CAR',
});

module.exports = connection;

connection.connect((error) => {
    if (error){
        console.error("connect failed: "+error.stack);
        return;
    }
    console.log("connect success!");
});

connection.query("select * from car", (error, result)=>{
    if (error){
        console.log("select failed: " + error.message);
        return;
    }
    console.log(result);
});


connection.end();

