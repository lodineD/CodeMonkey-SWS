var baseMaps = {
    "Default": L.tileLayer.provider('OneMap.Default'),
    "Original": L.tileLayer.provider('OneMap.Original'),
    "Night": L.tileLayer.provider('OneMap.Night'),
    "Grey": L.tileLayer.provider('OneMap.Grey')
};
var map = L.map('mapdiv').setView([1.3521, 103.8198], 13);
L.tileLayer.provider('OneMap.Grey').addTo(map);
L.control.layers(baseMaps).addTo(map);

function getCurrentPosition() {
    if ("geolocation" in navigator) {
        // 获取地理位置信息
        navigator.geolocation.getCurrentPosition(
            function (position) {
                // 获取经纬度信息
                window.current_user_latitude = position.coords.latitude;
                window.current_user_longitude = position.coords.longitude;

                // 在页面上显示经纬度
                console.log(`当前经度：${window.current_user_latitude}, 当前纬度：${window.current_user_longitude}`);
            },
            function (error) {
                console.error("获取地理位置失败:", error.message);
            }
        );
    } else {
        console.error("浏览器不支持Geolocation API");
    }
}

getCurrentPosition();