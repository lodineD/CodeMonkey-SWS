const dataContainer = document.getElementById("dataContainer");

var blueIcon = new L.Icon({
    iconUrl: './images/marker-icon.png',
    shadowUrl: './images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],   
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


function fetchData() {
    axios.get("/get-data")
        .then(response => {
            const data = response.data;
            // 全局变量，用于传送值
            window.processData = data;
            
            data.forEach((data) => {
                const { latitude, longitude, car_num } = data;
                console.log("Latitude:", latitude);
                console.log("Longitude:", longitude);
                console.log("Car Number:", car_num);

                // 显示标记点，并弹出窗口
                var point = L.marker([latitude, longitude], { icon: blueIcon }).addTo(map);
                point.bindPopup(`Car Number: ${car_num}`);
            });
        })

        .catch(error => {
            console.log("Error:", error);
        });
}

// 初始加载数据
fetchData();

// 每10秒重新加载数据
setInterval(fetchData, 10000);
