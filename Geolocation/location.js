var totalDistance = 0.0;
var lastLat, lastLong;
var map = new BMap.Map('allmap');
map.enableScrollWheelZoom(true);

window.onload = function() {
  /**
   * 检测浏览器是否支持Geolocation
   */
  if (!navigator.geolocation) {
    document.getElementById('support').innerHTML = 'HTML5 Geolocation doesnot support.';
    document.getElementById('support').style.display = 'block';
  }

  //获取位置信息
  navigator.geolocation.watchPosition(updateLocation, handleLocationError,
    {maximumAge:1000, timeout:10000});

  updateStatus('请求位置信息中…');
}

/**
 * 更新位置函数
 * @param  {Object} pos 返回位置对象
 * @return {[type]} null 空
 */
function updateLocation (pos) {
  endRequest();
  var latitude = pos.coords.latitude;
  var longitude = pos.coords.longitude;
  var accuracy = pos.coords.accuracy;
  var timestamp = new Date(pos.timestamp).toLocaleDateString();

  document.getElementById('latitude').innerHTML = latitude;
  document.getElementById('longitude').innerHTML = longitude;
  document.getElementById('accuracy').innerHTML = '位置精确度为' + accuracy + '米';
  document.getElementById('timestamp').innerHTML = timestamp;

  if (!!lastLat && !!lastLong) {
    var currentDistance = distance(latitude, longitude, lastLat, lastLong);
    document.getElementById('currentDist').innerHTML = '当前移动距离：' + currentDistance.toFixed(4) + ' km';
    totalDistance += currentDistance;
    document.getElementById('totalDist').innerHTML = '总共移动距离：' + totalDistance.toFixed(4) + ' km';
  }

  map.centerAndZoom(new BMap.Point(latitude, longitude), 11);

  lastLat = latitude;
  lastLong = longitude;

  updateStatus('位置更新成功！');
}

/**
 * 更新位置时错误处理函数
 * @param  {Object} err 错误对象
 * @return {null}  null 空
 */
function handleLocationError (err) {
  endRequest();
  switch (err.code) {
    case 0: updateStatus('浏览器探测地址时出错，' + err.message);
      break;
    case 1: updateStatus('用户未开启位置信息！');
      break;
    case 2: updateStatus('浏览器探测不到用户地址，' + err.message);
      break;
    case 3: updateStatus('浏览器探测地址超时！');
      break;
  }
}

/**
 * 显示错误信息
 * @param  {String} message 错误信息
 * @return {Null}         空
 */
function updateStatus (message) {
  document.getElementById('status').innerHTML = message;
}

/**
 * 请求成功
 * @return {String} 请求成功
 */
function endRequest () {
  updateStatus('请求成功！')
}

/**
 * 度数转弧度
 * @param  {Number} degree 角度值
 * @return {Number}        弧度值
 */
function toRadians (degree) {
  return degree * Math.PI / 180;
}

/**
 * 计算距离
 * @param  {Number} latitude1  纬度1
 * @param  {Number} longitude1 经度1
 * @param  {Number} latitude2  纬度2
 * @param  {Number} longitude2 经度2
 * @return {Number}            两点距离
 */
function distance (latitude1, longitude1, latitude2, longitude2) {
  var R = 6371; //地球的半径，单位千米
  var deltaLatitude = toRadians(latitude1 - latitude2);
  var deltaLongitude = toRadians(longitude1 - longitude2);

  latitude1 = toRadians(latitude1);
  latitude2 = toRadians(latitude2);

  /**
   * 球面半正失（Haversine）公式
   */
  var a = Math.sin(deltaLatitude/2) * Math.sin(deltaLatitude/2) +
          Math.cos(latitude1) * Math.cos(latitude2) *
          Math.sin(deltaLongitude/2) * Math.sin(deltaLongitude/2);

  var c = 2 * Math.asin(Math.sqrt(a));
  var d = R * c;
  return d;
}
