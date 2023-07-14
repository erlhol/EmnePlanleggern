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

function disqus() {
    /**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
    /*
    var disqus_config = function () {
    this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    */
    (function() { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        s.src = 'https://emneplanleggern.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
        })();
}

disqus();