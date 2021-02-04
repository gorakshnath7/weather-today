var currentDay = moment().format('MMMM Do YYYY');



var data
var cityName
var temp
var humidity
var windspeed
var uvi
var uvindex
var forecast5
var weatherData
var lon
var lat
var icon
var fdate
var ftemp
var ficon
var fhumid


var city 
//search for city
async function doSearch(event){
    event.preventDefault()
    city = document.querySelector("#city-search").value
    console.log( `search(${city})`)
  
   
    //search openWeather for info
    data = await fetch ( "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=7cc8c49decf9f1dad6cc72eebd7c1304&units=metric").then( r=>r.json())
        console.log (`..weatherData: `, data)
    //save data as variables
    title = data.main.name
    temp = data.main.temp
    humidity = data.main. humidity
    windspeed = data.wind.speed * 3.6
    lat = data.coord.lat
    lon = data.coord.lon
    /*
    var saveSearch = { 
        city =`${city}`,
        temp = `${temp}`,
        humidity = `${humidity}`,
        windspeed = `${windspeed}`,
        lat = `${lat}`,
        lon = `${lon}`
    }*/
        
    document.querySelector("#past-search").innerHTML += `
        <li class="list-group-item" id="city[i]">${city}</li>`

    searchUV()
    async function searchUV(){
    
    uvi = await fetch ( "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=7cc8c49decf9f1dad6cc72eebd7c1304").then( r=>r.json() )
    console.log( `..UVI`, uvi)
    
    icon = uvi.current.weather[0].main
    if(icon = "Clouds"){`<i class="fas fa-cloud"></i>`}
    else if( icon = "Rain"){`<i class="fas fa-cloud-rain"></i>`}
    else if(icon = "Sun"){`<i class="fas fa-sun"></i>`}
    else{''}



    uvindex = uvi.current.uvi
    
    document.querySelector("#weatherInfo").innerHTML = `
    <div class="card" id="weatherData">
        <div class="card-body">
            <h3 class="card-title">${city}  (${currentDay}) ${icon}</h3>
            <p class="card-text" id="temp">Temperature: ${temp} C</p>
            <p class="card-text" id="humid">Humidity: ${humidity} %</p>
            <p class="card-text" id="speed">Wind Speed: ${windspeed} km/hr</p>
            <p class="card-text" id="uv">UV Index: ${uvindex} </p>
        </div>
    </div>`
    if(`${uvindex}`> 0) {document.querySelector("#uv").style.color = "red"}
        
    fdate = uvi.daily[i].date,
    ficon = uvi.daily[i].weather[0].main,
    ftemp = uvi.daily[i].temp.day - 273.15,
    fhumid= uvi.daily[i].humidity 
    // for( i=0, i<5, i++){}       
    }    
    
    

     
    
    // localStorage.saveSearch 

    document.querySelector("#city-search").value = ''


    
    // uvindex = 
    // forecast5 = 
    
}        