class Data {

   constructor() {
       this.cityArray = this._getFromLocalStorage('weather');
    }

    _getFromLocalStorage(key){
        return JSON.parse(window.localStorage.getItem(key) || '[]');
    }

    _setToLocalStorage(array){
        window.localStorage.setItem('weather', JSON.stringify(array) );
    }

    getCityById(cityId){
        var i = 0;
        for(i = 0; i < this.cityArray.length; i++){
            if(this.cityArray[i].id === cityId){
                return i;
            }
        }
    }

   createWeatherObject(cityName) {
        return $.ajax({
            method: 'GET',
            url: "http://api.apixu.com/v1/current.json?key=cd97d616d7d54aba9f2122557180205&q=" + cityName
        });
    }

    createWeatherArray(dataObj) {
        this.cityArray.push(dataObj); 
        window.localStorage.setItem('weather', JSON.stringify(this.cityArray) );
        }

    createCommentArray(weatherComment, cityId) {
            var comment = {
                text: weatherComment
            };

            this.cityArray[this.getCityById(cityId)].comment.push(comment);
            window.localStorage.setItem('weather', JSON.stringify(this.cityArray) );
        }

    deleteCity(cityId){
        var cityIndex = this.getCityById(cityId);
        this.cityArray.splice(cityIndex, 1);
        this._setToLocalStorage(this.cityArray);
    }    
    
    }        
    
    export {Data};