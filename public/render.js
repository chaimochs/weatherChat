class Render {


    renderWeather(dataObj) {

        var source = $('#weather-template').html();
        var template = Handlebars.compile(source);

        var html = template(dataObj);
        $("#weather-container").empty();
        $("#weather-container").append(html);
    }

    renderComment(dataObj) {

        var source = $('#weather-template').html();
        var template = Handlebars.compile(source);
        var html = template(dataObj);
        $("#weather-container").empty();
        $("#weather-container").append(html);
    }

    removeWeatherDiv(cityDiv){
       $(cityDiv).remove();
    }

};



export {Render};