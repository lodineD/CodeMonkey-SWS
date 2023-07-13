var startlat = '1.30000';
var startlng = '103.84223';
var endlat = '1.31801';
var endlng = '103.84224';

$(document).ready(function getRoute() {

    var api_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwNTU4LCJ1c2VyX2lkIjoxMDU1OCwiZW1haWwiOiJjaGVuZ2hhbmcwNTE2QDE2My5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvb20yLmRmZS5vbmVtYXAuc2dcL2FwaVwvdjJcL3VzZXJcL3Nlc3Npb24iLCJpYXQiOjE2ODkxNTIwNjYsImV4cCI6MTY4OTU4NDA2NiwibmJmIjoxNjg5MTUyMDY2LCJqdGkiOiJiZTQ2ZDI3NzA4NzJmNjI3ZjgzMmRmMGJjZDhiMzk4NCJ9.r0G8a9kIx5lZ5N40EtVya2ysoSIx5UHSYLDah_2Hp1I'; // 替换为您的API Token

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
    var baseMaps = {
        "Default": L.tileLayer.provider('OneMap.Default'),
        "Original": L.tileLayer.provider('OneMap.Original'),
        "Night": L.tileLayer.provider('OneMap.Night'),
        "Grey": L.tileLayer.provider('OneMap.Grey')
    };


    var center = L.bounds([startlat, startlat], [endlat, endlat]).getCenter();

    var map = L.map('mapdiv');

    L.tileLayer.provider('OneMap.Grey').addTo(map);

    L.control.layers(baseMaps).addTo(map);

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
