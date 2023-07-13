const processed = require('./connect_db.js');

// var map = L.map('map').setView([1.3521, 103.8198], 13);
// L.tileLayer.provider('OneMap.Grey').addTo(map);

processed.forEach((data) => {
    const { latitude, longitude, car_num } = data;
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    console.log("Car Number:", car_num);

    // 显示标记点，并弹出窗口
    const point = L.marker([latitude, longitude]).addTo(map);
    point.bindPopup(`Car Number: ${car_num}`);
});
