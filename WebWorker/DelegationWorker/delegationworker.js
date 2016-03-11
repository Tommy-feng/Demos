/*
* define the country list in the whole word
* take following Array as an example
*/

var country_list = ['Albania', 'Algeria', 'American', ...];

var total_population = 0;
var country_size = country_list.length;
var processing_size = country_list.length;

for (var i = 0; i < country_size; i++) {
  var worker = new Worker('subworker.js');
  var command = {command: 'start', country: country_size[i]};
  worker.postMessage(command);
  worker.onmessage = update_results;
}

function update_results (event) {
  total_population += event.data;
  processing_size -= 1;
  if (processing_size <= 0) {
    postMessage(total_population);
  }
}
