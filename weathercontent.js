// ### CHOOSE BACKGROUND IMAGE BASED ON LAT/LONG/DARKSKY API METHOD ###


const app = document.getElementById('root');
const dataicon = document.createElement('img');
//change logo depending on what the weather is --> need to create variable?
//cloud.src = 'raincloud.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

var my_url;


$(document).ready(function() {
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    }
    else 
    {
        alert('It seems like Geolocation, which is required for this page, is not enabled in your browser.');
    }

});
function successFunction(position) 
{
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    my_url = 'https://api.darksky.net/forecast/7300039d3536c48c0df70b29c51a39b3/' + lat + ',' + long;
    
    var request = new XMLHttpRequest();

    request.open('GET', my_url);

    request.onload = function() {
        var data = JSON.parse(this.response);
        if (request.status>=200 && request.status < 400) {
            const h1 = document.createElement('h1');
            h1.textContent = data.currently.summary;
            container.appendChild(h1);
            var dinfo = data.currently.icon;
            //console.log(data.currently.icon);
            if ((dinfo == 'partly-cloudy-day') || (dinfo=='partly-cloudy-night'))
                dataicon.src = 'partly_cloudy.png';
            if ((dinfo=='clear-day')||(dinfo=='clear-night'))
                dataicon.src = 'sun.png';
            else dataicon.src == 'raincloud.png';

            //app.appendChild(dataicon);
        } else {
            console.log('error');
        }
    }
    request.send();

}


function errorFunction(position) 
{
    alert('Error!');
}
app.appendChild(dataicon);
app.appendChild(container);
