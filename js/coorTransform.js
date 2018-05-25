//国测局坐标(火星坐标,比如高德地图在用),百度坐标,wgs84坐标(谷歌国外以及绝大部分国外在线地图使用的坐标)
//百度经纬度坐标转国测局坐标
$(function () {
    $("#button2").click(function () {
        $.ajax({
            type:"GET",
            url:"./data/2015040119.txt",
            dataType: "text",
            async: true
        }).done(function (data) {
            var find = data.split("\n");
            var pointArr = [];
            for(var i = 0; i<find.length;i++){
                console.log(find[i]);
                var line = find[i].split(",");
                var latitude = (parseInt(line[16]).div(Math.pow(10,7)));
                var longitude = (parseInt(line[15]).div(Math.pow(10,7)));
               // console.log(i+coordtransform.bd09togcj02(longitude,latitude));
                tmp1 = coordtransform.wgs84togcj02(longitude,latitude)
                tmp = coordtransform.gcj02tobd09(tmp1[0],tmp1[1]);
                var bpoint = new BMap.Point(tmp[0],tmp[1]);
                var dmarker = new BMap.Marker(bpoint);
                mymap.addOverlay(dmarker);
                //var label = new BMap.Label("转换后的百度坐标（正确）",{offset:new BMap.Size(20,-10)});
                //dmarker.setLabel(label); //添加百度label
                if(i==find.length-1){
                    mymap.setCenter(bpoint);
                }
            }
        })
    })
})
var bd09togcj02=coordtransform.bd09togcj02(116.404, 39.915);
//国测局坐标转百度经纬度坐标
var gcj02tobd09=coordtransform.gcj02tobd09(116.404, 39.915);
//wgs84转国测局坐标
var wgs84togcj02=coordtransform.wgs84togcj02(116.404, 39.915);
//国测局坐标转wgs84坐标
var gcj02towgs84=coordtransform.gcj02towgs84(116.404, 39.915);
