console.log('This would be the main JS file.');

function myFunction() {
    document.getElementById("demo").innerHTML = "Teksten ble endret";
  }

  document.getElementById("mon-8").innerHTML = "Meeting";
  document.getElementById("tue-10").innerHTML = "Lunch";
  document.getElementById("wed-14").innerHTML = "Training";
  document.getElementById("thu-16").innerHTML = "Presentation";

function apiTest() {
    fetch('https://api.nilu.no/stats/day/2018-09-17/2018-09-18/manglerud?components=pm10', {
        method: 'GET'
    })
  .then(response => response.json())
  .then(data => {
    // Process the data returned from the API
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  });
    
}