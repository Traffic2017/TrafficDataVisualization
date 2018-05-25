function updateDate(){
    var date = $("#date_picker").val();
    var hour = $("#time_picker").val();
    var redate = date.split("/");
    var rehour = hour.split(":");
    var judgeNoon = hour.split(" ");
    if(judgeNoon[1].toString() ==="PM"){
        rehour[0]= (parseInt(rehour[0]) + 12).toString();
    }
    console.log(rehour);
    var newUrl = "data/hour/"+redate[2]+redate[1]+redate[0]+rehour[0]+".txt";
    console.log(newUrl);
    $.get(newUrl, function (rs) {

        var data = [];
        var timeData = [];

        rs = rs.split("\n");
        // console.log(rs.length);
        var maxLength = 0;
        for (var i = 0; i < rs.length; i++) {
            var item = rs[i].split(',');
            // var coordinates = [];
            var lngSubscript = 15;
            var latSubscript = 16;
            var timeSubscript = 19;
            var latitude = (parseInt(item[latSubscript]).div(Math.pow(10,7)));
            var lngitude = (parseInt(item[lngSubscript]).div(Math.pow(10,7)));
            var tmp = coordtransform.wgs84togcj02(lngitude,latitude);
            var tmp1 = coordtransform.gcj02tobd09(tmp[0],tmp[1]);
            // coordinates.push([item[lngSubscript], item[latSubscript]]);
            timeData.push({
                geometry: {
                    type: 'Point',
                    coordinates: [tmp1[0], tmp1[1]]
                },
                time: item[timeSubscript],
                count:1
            });
        }
        var dataSet = new mapv.DataSet(timeData);

        var options = {
            fillStyle: 'rgba(55, 50, 250, 0.8)',
            shadowColor: 'rgba(255, 250, 50, 1)',
            shadowBlur: 20,
            size: 30,
            globalAlpha: 0.5,
            label: {
                show: true,
                fillStyle: 'white',
                // shadowColor: 'yellow',
                // font: '20px Arial',
                // shadowBlur: 10,
            },
            gradient: {0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
            draw: 'grid'
        }

        var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
    });
}
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#time_picker').onchange = updateDate
})

function updateHotSpot(lng,lat,address) {
    var setID = "#hot_spot"+countHotSpot.toString();
    console.log(firstTime);
    if(!firstTime){
        myHotSpot.next();
    }
    else {
        firstTime = 0;
    }
    myHotSpot = M.Carousel.getInstance(document.querySelector('.carousel'));
    $(setID).html(`<p>lng:${lng}<br/>lat:${lat}<br/>地址:${address.province+", "+address.city+", "+address.district+", "+address.street+", "+address.streetNumber}</p>`);
}
function searchNearby() {

}
$('#searchNearbyshop').click(function () {
    var setID = "#hot_spot"+countHotSpot.toString();
    var content = $(setID).text();
    divContent = content.split(":");
    var reg = /\d+(\.\d+)/g;
    console.log(divContent);
    lng = parseFloat(divContent[1].match(reg)[0]);
    lat = parseFloat(divContent[2].match(reg)[0]);
    console.log(lng);
    console.log(lat);
    var map = new BMap.Map("map2");            // 创建Map实例
    var mPoint = new BMap.Point(lng, lat);
    map.enableScrollWheelZoom();
    map.centerAndZoom(mPoint,15);

    var circle = new BMap.Circle(mPoint,1000,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
    map.addOverlay(circle);
    var local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false}});
    local.searchNearby('百货',mPoint,1000);
});
$('#searchNearbybus').click(function () {
    var setID = "#hot_spot"+countHotSpot.toString();
    var content = $(setID).text();
    divContent = content.split(":");
    var reg = /\d+(\.\d+)/g;
    console.log(divContent);
    lng = parseFloat(divContent[1].match(reg)[0]);
    lat = parseFloat(divContent[2].match(reg)[0]);
    console.log(lng);
    console.log(lat);
    var map = new BMap.Map("map2");            // 创建Map实例
    var mPoint = new BMap.Point(lng, lat);
    map.enableScrollWheelZoom();
    map.centerAndZoom(mPoint,15);

    var circle = new BMap.Circle(mPoint,1000,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
    map.addOverlay(circle);
    var local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false}});
    local.searchNearby('公交车站',mPoint,1000);
});
$('#searchNearbysubway').click(function () {
    var setID = "#hot_spot"+countHotSpot.toString();
    var content = $(setID).text();
    divContent = content.split(":");
    var reg = /\d+(\.\d+)/g;
    console.log(divContent);
    lng = parseFloat(divContent[1].match(reg)[0]);
    lat = parseFloat(divContent[2].match(reg)[0]);
    console.log(lng);
    console.log(lat);
    var map = new BMap.Map("map2");            // 创建Map实例
    var mPoint = new BMap.Point(lng, lat);
    map.enableScrollWheelZoom();
    map.centerAndZoom(mPoint,15);

    var circle = new BMap.Circle(mPoint,1000,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
    map.addOverlay(circle);
    var local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false}});
    local.searchNearby('地铁站',mPoint,1000);
});
$('#searchNearbyrailway').click(function () {
    var setID = "#hot_spot"+countHotSpot.toString();
    var content = $(setID).text();
    divContent = content.split(":");
    var reg = /\d+(\.\d+)/g;
    console.log(divContent);
    lng = parseFloat(divContent[1].match(reg)[0]);
    lat = parseFloat(divContent[2].match(reg)[0]);
    console.log(lng);
    console.log(lat);
    var map = new BMap.Map("map2");            // 创建Map实例
    var mPoint = new BMap.Point(lng, lat);
    map.enableScrollWheelZoom();
    map.centerAndZoom(mPoint,15);

    var circle = new BMap.Circle(mPoint,1000,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
    map.addOverlay(circle);
    var local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false}});
    local.searchNearby('车站',mPoint,1000);
});
$('#searchNearbyschool').click(function () {
    var setID = "#hot_spot"+countHotSpot.toString();
    var content = $(setID).text();
    divContent = content.split(":");
    var reg = /\d+(\.\d+)/g;
    console.log(divContent);
    lng = parseFloat(divContent[1].match(reg)[0]);
    lat = parseFloat(divContent[2].match(reg)[0]);
    console.log(lng);
    console.log(lat);
    var map = new BMap.Map("map2");            // 创建Map实例
    var mPoint = new BMap.Point(lng, lat);
    map.enableScrollWheelZoom();
    map.centerAndZoom(mPoint,15);

    var circle = new BMap.Circle(mPoint,1000,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
    map.addOverlay(circle);
    var local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false}});
    local.searchNearby('学校',mPoint,1000);
});
$('#searchNearbywhatshot').click(function () {
    var setID = "#hot_spot"+countHotSpot.toString();
    var content = $(setID).text();
    divContent = content.split(":");
    var reg = /\d+(\.\d+)/g;
    console.log(divContent);
    lng = parseFloat(divContent[1].match(reg)[0]);
    lat = parseFloat(divContent[2].match(reg)[0]);
    console.log(lng);
    console.log(lat);
    var map = new BMap.Map("map2");            // 创建Map实例
    var mPoint = new BMap.Point(lng, lat);
    map.enableScrollWheelZoom();
    map.centerAndZoom(mPoint,15);

    var circle = new BMap.Circle(mPoint,1000,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
    map.addOverlay(circle);
    var local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false}});
    local.searchNearby('景点',mPoint,1000);
});
