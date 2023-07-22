
var greenIcon = new L.Icon({
    iconUrl: './images/marker-icon-green.png',
    shadowUrl: './images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var RedIcon = new L.Icon({
    iconUrl: './images/marker-icon-red.png',
    shadowUrl: './images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var yellowIcon = new L.Icon({
    iconUrl: './images/marker-icon-yellow.png',
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
        })
        .catch(error => {
            console.log("Error:", error);
        });
}

// 初始加载数据
fetchData();

// 每300秒重新加载数据
setInterval(fetchData, 300000);
