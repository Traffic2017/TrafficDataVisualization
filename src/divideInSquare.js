var mychart = echarts.init(document.getElementById('map-wrap'))
var option = {
    title:{
        text: "浙江省地图"
    },
    legend:{
    },
    bmap:{
        center:[120.2,30.3],
        zoom:11,
        roam: true,
        mapStyle:{
            style:'normal'
        }
    },
};
mychart.setOption(option);
mymap = mychart.getModel().getComponent('bmap').getBMap();
// mymap.addEventListener("click",function (e) {
//     console.log(e.point.lng+","+e.point.lat)
// });
function getVline() {
    //console.log("test")
    var x1 = 119.86195;
    var y1 = 30.46649;
    var x2 = 119.86195;
    var y2 = 30.019213;
    for (var i = 0; i < 100; i++) {
        var d = []
        d.push(new BMap.Point(x1 + 0.0077268*i, y1 ))
        d.push(new BMap.Point(x2 + 0.0077498*i, y2 ))
        var Vpolyline = new BMap.Polyline(d);
        mymap.addOverlay(Vpolyline)
    }
    return ;
}
getVline()

function getHline() {
    //console.log("test")
    var x1 = 119.86195;
    var y1 = 30.46649;
    var x2 = 120.63463;
    var y2 = 30.46649;
    for (var i = 0; i < 100; i++) {
        var d = []
        d.push(new BMap.Point(x1 , y1 -0.00447277*i ))
        d.push(new BMap.Point(x2 , y2 -0.00447277*i))
        var Hpolyline = new BMap.Polyline(d);
        mymap.addOverlay(Hpolyline)
    }
    return ;
}
getHline()
var polyline = new BMap.Polyline([
    new　BMap.Point(119.86195,30.46649),
    new　BMap.Point(120.63463,30.46649),
    new　BMap.Point(120.63463,30.019213),
    new　BMap.Point(119.86195,30.019213),
    new　BMap.Point(119.86195,30.46649)

]);
// var flag = 1;
// if(flag) {
//     for (var i = 0; i < 4; i++) {
//         tmp1 = coordtransform.bd09togcj02(119.86195, 30.46649);
//         tmp2 = coordtransform.bd09togcj02(120.63463, 30.46649);
//         tmp3 = coordtransform.bd09togcj02(120.63463, 30.019213);
//         tmp4 = coordtransform.bd09togcj02(119.86195, 30.019213);
//         t1mp = coordtransform.gcj02towgs84(tmp1[0], tmp1[1]);
//         t2mp = coordtransform.gcj02towgs84(tmp2[0], tmp2[1]);
//         t3mp = coordtransform.gcj02towgs84(tmp3[0], tmp3[1]);
//         t4mp = coordtransform.gcj02towgs84(tmp4[0], tmp4[1]);
//         console.log("aaaaaaaaaaaaaaa" + t1mp);
//         console.log("aaaaaaaaaaaaaaa" + t2mp);
//         console.log("aaaaaaaaaaaaaaa" + t3mp);
//         console.log("aaaaaaaaaaaaaaa" + t4mp);
//     }
//     flag = 0;
// }

mymap.addOverlay(polyline)


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
$(function () {
    $("#button1").click(function () {
        $.ajax({
            type:"GET",
            url:"./data/hour/2015040109.txt",
            dataType: "text",
            async: true

        }).done(function (data) {
            var find = data.split("\n");
            var pointArr = [];
            for(var i = 0; i<find.length;i++){
                console.log(find[i]);
                var line = find[i].split(",");
                var latitude = (parseInt(line[16]).div(Math.pow(10,7))).toString();
                var latitude1 = (parseInt(line[16]).div(Math.pow(10,7)));
                var longitude = (parseInt(line[15]).div(Math.pow(10,7))).toString();
                var longitude1 = (parseInt(line[15]).div(Math.pow(10,7)));
                var tmp = coordtransform.wgs84togcj02(longitude,latitude);
                var tmp1 = coordtransform.gcj02tobd09(tmp[0],tmp[1]);
                var tmpPoint = new　BMap.Point(tmp1[0],tmp1[1]);
                var marker = new BMap.Marker(tmpPoint);
                mymap.addOverlay(marker);
                //console.log(tmpPoint);
            }
        })
    })
})

