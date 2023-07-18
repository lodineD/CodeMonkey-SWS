// const processed = require('./connect_db.js');
// import processed from './connect_db.js';
// const processed = window.processedData

// var map = L.map('map').setView([1.3521, 103.8198], 13);
// L.tileLayer.provider('OneMap.Grey').addTo(map);

console.log(window.processedData);

var blueIcon = new L.Icon({
    iconUrl: './images/marker-icon.png',
    shadowUrl: './images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],   
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

window.processedData.forEach((data) => {
    const { latitude, longitude, car_num } = data;
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    console.log("Car Number:", car_num);

    // 显示标记点，并弹出窗口
    var point = L.marker([latitude, longitude], { icon: blueIcon }).addTo(map);
    point.bindPopup(`Car Number: ${car_num}`);
});
