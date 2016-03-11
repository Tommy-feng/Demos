 //define the onmessage hander for the delegation
 onmessage = start_calculate;

function start_calculate (event) {
  var command = event.data.command;
  var country = event.data.country;

  if (command!=null && command='start') {
    do_calculate(country);
  }

  onmessage = null;
}

function do_calculate (country) {
  var population = 0;
  var cities = //get all the cities for this country;
  for (var i = 0; i < cities.length; i++) {
    var city_popu = 0;
    population += city_popu;
  }
  postMessage(population);
  close();
}
