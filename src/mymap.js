
/**
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
}

//给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function (arg) {
    return accDiv(this, arg);
};
// 百度地图API功能
var map = new BMap.Map("map", {
    enableMapClick: false
});    // 创建Map实例
var mycity = ["杭州"];
var mycityCenter = mapv.utilCityCenter.getCenterByCityName(mycity[0]);
console.log(mycityCenter.lng, mycityCenter.lat);
map.centerAndZoom(new BMap.Point(mycityCenter.lng, mycityCenter.lat), 12);  // 初始化地图,设置中心点坐标和地图级别
map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
var geoc = new BMap.Geocoder();
map.addEventListener("click",function(e){
   var pt = e.point;
   geoc.getLocation(pt, function (rs) {
       updateHotSpot(e.point.lng,e.point.lat,rs.addressComponents);
   })
    countHotSpot = (countHotSpot+1)%5;
});
map.setMapStyle({
    style: 'normal'
});
$.get('data/hour/2015040109.txt', function (rs) {

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
// var options = {
//     fillStyle: 'rgba(55, 50, 250, 0.8)',
//     shadowColor: 'rgba(55, 50, 250, 1)',
//     shadowBlur: 20,
//     size: 3,
//     draw: 'simple'
// }
//var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
