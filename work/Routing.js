var startlat = '1.30000';
var startlng = '103.84223';
var endlat = '1.31801';
var endlng = '103.84224';
// 1.30000,103.84223
// 1.31801,103.84224
// var startlat = window.startingPointLatitude;
// var startlng = window.startingPointLongitude;
// var endlat = window.destinationLatitude;
// var endlng = window.destinationLongitude;

console.log(startlat);
console.log(endlat);

$(document).ready(function getRoute() {

    var api_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkODhkZGQzMzU2MGVkNzlkNzkwOTI0ODY1MGE4NmNhNCIsImlzcyI6Imh0dHA6Ly9pbnRlcm5hbC1hbGItb20tcHJkZXppdC1pdC0xMjIzNjk4OTkyLmFwLXNvdXRoZWFzdC0xLmVsYi5hbWF6b25hd3MuY29tL2FwaS92Mi91c2VyL3Bhc3N3b3JkIiwiaWF0IjoxNjg5ODY5NTk2LCJleHAiOjE2OTAxMjg3OTYsIm5iZiI6MTY4OTg2OTU5NiwianRpIjoidzhwQVRtcHNjVGNIajV0ZCIsInVzZXJfaWQiOjExOSwiZm9yZXZlciI6ZmFsc2V9.gDYkuBAE-C9fBGPz1mqSpFS61gU6ahKu8HeRCW_z-B0'; // 替换为您的API Token

    var url = `https://developers.onemap.sg/privateapi/routingsvc/route?start=${startlat},${startlng}&end=${endlat},${endlng}&routeType=drive&token=${api_token}`;

    $.ajax({
        url: url,
        type: 'GET',
        success: function (response) {
            // 处理响应数据
            console.log(response);
            decodeGeometry(response);
            // 在这里根据返回的数据进行相应的操作
        },
        error: function (error) {
            console.log('请求失败:', error);
        }
    });
});

function decodeGeometry(sampleRoute) {
    // var baseMaps = {
    //     "Default": L.tileLayer.provider('OneMap.Default'),
    //     "Original": L.tileLayer.provider('OneMap.Original'),
    //     "Night": L.tileLayer.provider('OneMap.Night'),
    //     "Grey": L.tileLayer.provider('OneMap.Grey')
    // };


    var center = L.bounds([startlat, startlat], [endlat, endlat]).getCenter();

    // var map = L.map('mapdiv');

    // L.tileLayer.provider('OneMap.Grey').addTo(map);

    // L.control.layers(baseMaps).addTo(map);

    //图标生成与颜色设置   
    var greenIcon = new L.Icon({
        iconUrl: './images/marker-icon-green.png',
        shadowUrl: './images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var blackIcon = new L.Icon({
        iconUrl: './images/marker-icon-black.png',
        shadowUrl: './images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var startmarker = L.marker([startlat, startlng], { icon: blackIcon }).addTo(map);
    var endmarker = L.marker([endlat, endlng], { icon: greenIcon }).addTo(map);
    // startmarker.bindPopup(`Car Number: 5`);
    // var startmarker = L.marker([1.30011, 103.8422],{ icon: greenIcon }).addTo(map);

    // var asdf = L.marker([1.30011, 103.8422]).addTo(map);


    //得到route（未编译）
    var geometryOfRoute = sampleRoute.route_geometry;

    //解码
    var polyline = L.polyline(L.PolylineUtil.decode(geometryOfRoute, 5), {
        color: "purple",
        weight: 5,
        smoothFactor: 1
    });

    //边界
    var bounds = polyline.getBounds();

    //加入线条
    polyline.addTo(map);

    //缩放到边界
    map.fitBounds(bounds);
}