import {Data} from './data.js';
var weatherData = new Data();

import {Render} from './render.js';
var renderData = new Render();

//initialize webpage with local storage data

var dataObj = {
weather: weatherData._getFromLocalStorage('weather')
     //weather: JSON.parse(localStorage.getItem("weather"))
};
renderData.renderWeather(dataObj);


// get name of new city from input, and render it to page

$('.search-div').on('keypress click', '.city-button', function () {
    var cityName = $(this).closest('.search-div').find('.city-input').val();

    weatherData.createWeatherObject(cityName)
        .then(function (data) {
            var weatherObj = {
                name: data.location.name,
                tempF: data.current.temp_f,
                tempC: data.current.temp_c,
                last_time_updated: data.current.last_updated.substring(11, 5),
                last_date_updated: data.current.last_updated.substring(16, 10),
                condition: data.current.condition.text,
                icon: data.current.condition.icon,
                id: data.location.localtime_epoch,
                comment: []
            }

            //add weatherObj to an array
            weatherData.createWeatherArray(weatherObj);

            
            var dataObj = {
                weather: weatherData._getFromLocalStorage('weather')
            };
            //render city weather to page
            renderData.renderWeather(dataObj);


        }).catch(function (datjqXHR, textStatus, errorThrowna) {
            console.log(textStatus);
        });

})

    //get comment from input

$('#weather-container').on('click', '.comment-button', function () {
    var weatherComment = $(this).closest('.weather-div').find('.comment-input').val();
    var cityId         = $(this).closest('.weather-div').data().id; 


    //add comment to local storage

    weatherData.createCommentArray(weatherComment, cityId);

    //render comment to page

    var dataObj = {
        weather: JSON.parse(localStorage.getItem("weather"))
    };
    renderData.renderComment(dataObj);

});


//remove city weather from local storage and from page

$('#weather-container').on('click', '.fa-trash', function () {
    var cityDiv = $(this).closest('.weather-div');
    var cityId = cityDiv.data().id;
    weatherData.deleteCity(cityId);
    renderData.removeWeatherDiv(cityDiv);
});
