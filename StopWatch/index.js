window.onload = function() {
  var millisecNum = secondNum = minuteNum = hourNum = 0;
  var nIntervId;

  var time = document.getElementById('i_display');
  time.value = '00:00:00.000';

  document.getElementById('b_start').addEventListener('click', start);
  document.getElementById('b_stop').addEventListener('click', stop);
  document.getElementById('b_reset').addEventListener('click', reset);

  // 开始
  function start() {
    nIntervId = setInterval(timer, 50);
  }

  // 暂停
  function stop() {
    clearInterval(nIntervId);
    document.getElementById('b_stop')
    document.getElementById('b_stop').innerHTML = '继续';
  }

  // 重置
  function reset() {
    clearInterval(nIntervId);
    time.value = '00:00:00.000';
  }

  //计时
  function timer() {
    millisecNum+=50;
    if (millisecNum >= 1000) {
      secondNum ++;
      millisecNum = 0;
    }
    if (secondNum >= 60) {
      minuteNum ++;
      secondNum = 0;
    }
    if (minuteNum >= 60) {
      hourNum ++;
      minuteNum = 0;
    }
    if (hourNum >= 60) {
      hourNum = 0;
    }

    time.value = hourNum + ':' + minuteNum + ':' + secondNum + '.' + millisecNum;
  }

}
