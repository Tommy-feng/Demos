/**
 * this worder is used to calculate
 * the least common multiple
 * and the greatest common divisor
 */

onmessage = function(e) {
  var firstNum = e.data.first,
      secondNum = e.data.second;
  calculate(firstNum, secondNum);
}

/**
 * return the greatest common divisor and the least common multiple
 * @param  {Number} a 数字1
 * @param  {Number} b 数字2
 * @return {String} 返回结果
 */
function calculate(a, b) {
  var divisorNum =  divisor(a, b),
      multipleNum = multiple(a, b);
  postMessage('最小公倍数为：' + multipleNum + '；最大公约数为：' + divisorNum);
}

/**
 * calculate the greatest common divisor
 * @param  {Number} a 数字1
 * @param  {Number} b 数字2
 * @return {Number} 最大公约数
 */
function divisor(a, b) {
  if(a % b == 0) {
    return b;
  } else {
    return divisor(b, a % b);
  }
}

/**
 * calculate the least common multiple
 * @param  {Number} a 数字1
 * @param  {Number} b 数字2
 * @return {Number} 最小公倍数
 */
function multiple(a, b) {
  var divisorNum = divisor(a, b);
  return a*b/divisorNum;
}
