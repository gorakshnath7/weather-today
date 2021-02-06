
var day = moment().format('MMMM Do YYYY');
//var to start search
var city 
//variables for fetch results
var data
var uvi
//main weather variables
var temp
var humidity
var windspeed
var uvindex
var lon
var lat
//variables for five-day forecast
var icon
var fdate
var ftemp
var ficon
var fhumid
//var to create array of all data
var cityAll

//search for weather by city
async function doSearch(event){
    event.preventDefault()
    city = document.querySelector("#city-search").value
    console.log( `search(${city})`)
  
    //run fetch to openWeather for weather info
    data = await fetch ( "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=7cc8c49decf9f1dad6cc72eebd7c1304&units=metric").then( r=>r.json())
        console.log (`searching data for ${city}`, data)
    //save data as variables
    title = data.main.name
    temp = data.main.temp
    humidity = data.main. humidity
    windspeed = data.wind.speed * 3.6
    wsFIXED = windspeed.toFixed(2)
    lat = data.coord.lat
    lon = data.coord.lon
    
    //add city to previously searched cities
    document.querySelector("#past-search").innerHTML += `
    <li class="list-group-item" id="city[i]">${city}</li>`
    //call search for additional data to complete forecast
    searchUV()
}
//search for UV info and five-day forecast    
async function searchUV(){
    //run fetch for UV and forecast
    uvi = await fetch ( "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=7cc8c49decf9f1dad6cc72eebd7c1304").then( r=>r.json() )
    console.log( `searching uvi for ${city}`, uvi)
    
    uvindex = uvi.current.uvi
    icon = uvi.current.weather[0].main
    for( var i=0; i<4; i++) {
    ftemp = uvi.daily[i].temp.day - 273
    ftempFIXED = ftemp.toFixed(2);
    fhumid = uvi.daily[i].humidity
    }
   publishResults(city) 

    

}

//publish results in HTML page
function publishResults(city){
    //post weather information in card  
    document.querySelector("#title").innerHTML = `${city} (${day})`
    document.querySelector("#temp").innerHTML = `Temperature: ${temp} C `
    document.querySelector("#humid").innerHTML = `Humidity: ${humidity} %`
    document.querySelector("#speed").innerHTML = `Wind Speed: ${wsFIXED} km/hr`
    document.querySelector("#uv").innerHTML = `UV Index: ${uvindex}` 

    if(`${uvindex}` > 3 ) {document.querySelector("#uv").style.color = "red"}
    if(`${windspeed}` > 70 ) {document.querySelector("#speed").style.color = "red"}

    for (var i=0; i < 5; i++) {
    document.querySelector(`#datef${i}`).innerHTML = moment().add(1,'d').format('MMMM Do YYYY');
        if(icon = "Rain"){ 
            console.log("Rain");
            document.querySelector(`#icon${i}`).classList.replace("fa-sun", "fa-rain")
        } else if (icon = "Clouds"){ 
            console.log("Clouds")
            document.querySelector(`#icon${i}`).classList.replace("fa-sun", "fa-clouds")
        }
    document.querySelector(`#ftemp${i}`).innerHTML  = `${ftempFIXED} C`
    document.querySelector(`#fhumid${i}`).innerHTML  = `${fhumid} %`
    // storeCity(city)
    }
}
/*
function storeCity(city){
    localStorage.setItem(city,JSON.stringify(saveSearch))
    var city1 = JSON.parse(localStorage.getItem(city))
    }
    //make an array of all weather data
    cityAll = [ city, temp, humidity, windspeed, uvindex ]
*/
    
        
    
        
    


    
    document.querySelector("#city-search").value = ""