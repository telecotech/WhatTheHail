var repoList = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');


function getApi() {
  
  var requestUrl = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={8bc03c53619b53e2a55878c043a1bdc1}'
  ;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    for (var i = 0; i < data.length; i++) {
       
    var listItem = document.createElement('li');

       
    listItem.textContent = data[i].html_url;

        
    repoList.appendChild(listItem);
      }
    });
}

fetchButton.addEventListener('click', getApi);




  
  