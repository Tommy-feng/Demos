//服务端数据
var data= {
  "201471703": {
    "name": "tommy",
    "age": 18
  }
}
var getURL = url;
//模拟服务器取number
var getNumber = getURL.match(/number=.*&/).join().slice(7, -1);
//模拟服务器取callback
var getCallback = getURL.match(/callback=.*/).join().slice(9);
//返回调用的函数
var callback = new Function('return ' + getCallback + '(' + JSON.stringify(data[getNumber]) + ')');
//执行
callback();
