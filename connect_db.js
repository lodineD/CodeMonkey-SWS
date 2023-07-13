let mysql = require("mysql");

let connection = mysql.createConnection({
    host: "localhost",
    port: 22,
    user: "root",
    password: "",
    database: "",
});

export default connection;

// connection.connect((error) => {
//     if (error){
//         console.error("connect failed: "+error.stack);
//         return;
//     }
//     console.log("connect success!");
// });

// connection.query("select * from student", (error, result)=>{
//     if (error){
//         console.log("select failed: " + error.message);
//         return;
//     }
//     console.log(result);
// });


connection.end();

