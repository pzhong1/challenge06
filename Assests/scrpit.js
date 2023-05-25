$(document).ready(function () { //  code that is inside this ready method has to wait until the HTML has finish loading before running any js code
    var apiKey = "75c5af5c353621d37f558f040992d1fd"; // openWeather website API KEY
    var historyV = $('#search-history'); //id search-history from html file gave it a var name called historyV
    var currentWeatherV = $('#current-weather'); // id current-weather for html file gave it a var name called cueeentWeatherV
    var forecastV = $('#forecast'); // id forcase from html file gave it a var name caleed forecastV




    function getWeather(cityName) { // declares a function and gave it a name called getWeather this function will displaying weather information for a given city
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;  //  openWeather website API //  this is the website address https://openweathermap.org/current // weather?q={city name}&appid={API key} replace {} to + otherwise it will not work

        // Getting current weather that will display in top of the web page 
        fetch(queryURL)
            .then(response => response.json()) //return json data
            .then(function (response) { //response returned josin data 
                currentWeatherV.empty(); // delete currentWeater so that borswer will only display the newst data

                var cityNameDiv = $("<h3>").text(response.name); // crate h3 element to display weather info
                var iconUrl = "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png"; // this is for weather icon  the website is found at openWeather website
                var iconImg = $("<img>").attr("src", iconUrl); // display icon on web
                var temperatureDiv = $("<p>").text("Temperature: " + ((response.main.temp - 273.15) * 9 / 5 + 32).toFixed(2) + " °F"); // display temperture and set it to 2 decimal so the temp will ooks like 70.24
                var windSpeedDiv = $("<p>").text("Wind Speed: " + response.wind.speed + " m/s"); // display wind speed in current weather box
                var humidityDiv = $("<p>").text("Humidity: " + response.main.humidity + "%");// display humidity % in current waether box


                currentWeatherV.append(cityNameDiv, iconImg, temperatureDiv, humidityDiv, windSpeedDiv); // use append list to add all above infor in to the borswer for display


                // future weather infor(5days)
                var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
                fetch(forecastURL)
                    .then(forecastResponse => forecastResponse.json())
                    .then(function (forecastResponse) {
                        forecastV.empty();

                        for (let i = 0; i < forecastResponse.list.length; i += 8) {
                            var dayData = forecastResponse.list[i];
                            var forecastDate = $("<h4>").text(new Date(dayData.dt_txt).toLocaleDateString());
                            var iconUrlForecast = "http://openweathermap.org/img/w/" + dayData.weather[0].icon + ".png";
                            var iconImgForecast = $("<img>").attr("src", iconUrlForecast);



                            var forecastTemp = $("<p>").text("Temperature: " + ((dayData.main.temp - 273.15) * 9 / 5 + 32).toFixed(2) + " °F");



                            var forecastWindSpeed = $("<p>").text("Wind Speed: " + dayData.wind.speed + " m/s");

                            var forecastHumidity = $("<p>").text("Humidity: " + dayData.main.humidity + "%");

                            var forecastDayDiv = $("<div>").append(forecastDate, iconImgForecast, forecastTemp, forecastWindSpeed, forecastHumidity);
                            forecastV.append(forecastDayDiv);
                        }

                        if (historyV.children().toArray().find(city => city.textContent === cityName) === undefined) {
                            historyV.append($('<button>').addClass('history-item').text(cityName));
                        }
                    });
            });
    }

    $('form').on('submit', function (event) {
        event.preventDefault();// avoid  web refrash after submit to case problem
        var cityName = $('#city-input').val().trim();// input the city name in val() and use trim() to aovid any space that is in the input 
        getWeather(cityName);// get the city name after input city
    });

    $(historyV).on('click', '.history-item', function (event) {// when use search more than one city  then user can click the history to review the weather again with out type city again
        getWeather(event.target.textContent);
    });
});


















