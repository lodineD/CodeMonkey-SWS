// let mysql = require("mysql");

// let connection = mysql.createConnection({
//     host: 'car.cocfi12ed6lp.us-east-1.rds.amazonaws.com',
//     port: 3306,
//     user: 'admin',
//     password: 'ycx030830',
//     database: 'CAR',
// });


// connection.connect((error) => {
//     if (error) {
//         console.error("connect failed: " + error.stack);
//         return;
//     }
//     console.log("connect success!");
// });

// connection.query("select latitude, logitude, car_num from car", (error, results) => {
//     if (error) {
//         console.log("select failed: " + error.message);
//         return;
//     }
//     console.log(results);

// });

const results = [
    {
        latitude: 1.29531,
        longitude: 103.871,
        car_num: 6
    },
    {
        latitude: 1.31954,
        longitude: 103.879,
        car_num: 7
    },
    {
        latitude: 1.32396,
        longitude: 103.873,
        car_num: 5
    }
]

const processedData = results.map((row) => {
    return {
        latitude: row.latitude,
        longitude: row.longitude,
        car_num: row.car_num
    };
});

module.exports = processedData;

// connection.end();

