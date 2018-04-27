var unit = "°C";
var temperature;
var images = {
    cloud: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?cs=srgb&dl=adventure-calm-clouds-414171.jpg&fm=jpg",
    rain: "https://images.pexels.com/photos/832521/pexels-photo-832521.jpeg?cs=srgb&dl=blur-close-up-depth-of-field-832521.jpg&fm=jpg",
    snow: "https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg?cs=srgb&dl=black-and-white-cold-fog-235621.jpg&fm=jpg",
    sun: "https://images.pexels.com/photos/615348/forest-fog-sunny-nature-615348.jpeg?cs=srgb&dl=autumn-bright-daylight-615348.jpg&fm=jpg",
    hot: "https://images.pexels.com/photos/210307/pexels-photo-210307.jpeg?cs=srgb&dl=adventure-arid-barren-210307.jpg&fm=jpgs",
    clear: "https://images.pexels.com/photos/717526/pexels-photo-717526.jpeg?cs=srgb&dl=architecture-buildings-city-717526.jpg&fm=jpg"
}

function setTemp() {

    $("span#temp").text(" " + temperature).css({
        'color': '#ffd',
        'font-size': '30px'
    });
    $("a#unit").html(unit);
}

function convert() {
    if (unit === "°C") {
        //convert to Fahrenheit
        unit = "°F";
        temperature = (temperature * 9 / 5 + 32).toFixed(2);
    } else {
        //convert to Celcius
        unit = "°C";
        temperature = ((temperature - 32) * 5 / 9).toFixed(2);
    }

}

function setBackground(keyword) {
    var keys = Object.keys(images);
    for (i = 0; i < keys.length; i++) {
        var regex = new RegExp(keys[i], 'gi');
        if (keyword.match(regex) != null) {
            $('body').css({
                "background-image": "url(" + images[keys[i]] + ")",
                "background-size": "cover"
            });
            $('.container-fluid').css("background", "transparent");
            break;

        }

    }
}


$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            $.ajax({
                type: "GET",
                url: "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude,
                success: function(data) {
                    $("p#city").text(data.name);
                    temperature = (data.main.temp).toFixed(2);
                    setTemp();
                    $("img#icon").attr('src', data.weather[0].icon);
                    $("img#icon").attr('alt', data.weather[0].main);
                    setBackground(data.weather[0].main);
                }


            });

        });
        $("a#unit").click(function() {
            convert();
            setTemp();
        });
    }
});