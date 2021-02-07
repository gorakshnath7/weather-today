
var day = moment().format('M/D/Y');
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
var previous
var previouslgth


function LS() {
    if (localStorage.getItem('previous') === null) {
      console.log("Nothing in Local Storage")
      previous = []
    } else {
      previous = JSON.parse(localStorage.getItem('previous'))
    }
    
    displayPrevious()
  }

//search for weather by city
async function doSearch(event){
    event.preventDefault()
    city = document.querySelector("#city-search").value  
    console.log( `search ${city} `)
    
    //run fetch to openWeather for weather info
    data = await fetch ( "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=7cc8c49decf9f1dad6cc72eebd7c1304&units=metric").then( r=>r.json())
        console.log (`searching data for ${city}`, data)
    //save data as variables
    title = data.main.name
    icon = data.weather[0].icon
    temp = data.main.temp
    humidity = data.main. humidity
    windspeed = data.wind.speed * 3.6
    wsFIXED = windspeed.toFixed(1)
    lat = data.coord.lat
    lon = data.coord.lon
    
    //call search for additional data to complete forecast
    searchUV()
}
//search for UV info and five-day forecast    
async function searchUV(){
    //run fetch for UV and forecast
    uvi = await fetch ( "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=7cc8c49decf9f1dad6cc72eebd7c1304").then( r=>r.json() )
    console.log( `searching uvi for ${city}`, uvi)
    for ( var i=0; i < 5; i++ ) {
    uvindex = uvi.current.uvi
    ficon = uvi.daily[i].weather[0].icon
    ftemp = uvi.daily[i].temp.day - 273
    fhumid = uvi.daily[i].humidity
    }
   
    publishResults(city) 
}

//publish results in HTML page
function publishResults(city){
    //post weather information in card  
    document.querySelector("#cityName").innerHTML = `${city}`
    document.querySelector("#date").innerHTML = `(${day})` 
    document.getElementById('titleIcon').src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
    document.querySelector("#temp").innerHTML = `Temperature: ${temp} C `
    document.querySelector("#humid").innerHTML = `Humidity: ${humidity} %`
    document.querySelector("#speed").innerHTML = `Wind Speed: ${wsFIXED} km/hr`
    document.querySelector("#uv").innerHTML = `UV Index: ${uvindex}` 

    if(`${uvindex}` > 3 ) {document.querySelector("#uv").style.color = "red"}
    if(`${windspeed}` > 70 ) {document.querySelector("#speed").style.color = "red"}

    //Forecast date
    document.querySelector(`#datef1`).innerHTML = moment().add(1,'d').format('M/D/Y');
    document.querySelector(`#datef2`).innerHTML = moment().add(2,'d').format('M/D/Y');
    document.querySelector(`#datef3`).innerHTML = moment().add(3,'d').format('M/D/Y');
    document.querySelector(`#datef4`).innerHTML = moment().add(4,'d').format('M/D/Y');
    document.querySelector(`#datef5`).innerHTML = moment().add(5,'d').format('M/D/Y');
    //Forecast Icon
    document.getElementById('icon1').src = `http://openweathermap.org/img/w/${uvi.daily[0].weather[0].icon}.png`
    document.getElementById('icon2').src = `http://openweathermap.org/img/w/${uvi.daily[1].weather[0].icon}.png`
    document.getElementById('icon3').src = `http://openweathermap.org/img/w/${uvi.daily[2].weather[0].icon}.png`
    document.getElementById('icon4').src = `http://openweathermap.org/img/w/${uvi.daily[3].weather[0].icon}.png`
    document.getElementById('icon5').src = `http://openweathermap.org/img/w/${uvi.daily[4].weather[0].icon}.png`
    //Forecast temperature
    document.querySelector(`#ftemp1`).innerHTML  = `Temp: ${(uvi.daily[0].temp.day - 273).toFixed(1)} C`
    document.querySelector(`#ftemp2`).innerHTML  = `Temp: ${(uvi.daily[1].temp.day - 273).toFixed(1)} C`
    document.querySelector(`#ftemp3`).innerHTML  = `Temp: ${(uvi.daily[2].temp.day - 273).toFixed(1)} C`
    document.querySelector(`#ftemp4`).innerHTML  = `Temp: ${(uvi.daily[3].temp.day - 273).toFixed(1)} C`
    document.querySelector(`#ftemp5`).innerHTML  = `Temp: ${(uvi.daily[4].temp.day - 273).toFixed(1)} C`
    //Forecast humidity
    document.querySelector(`#fhumid1`).innerHTML  = `Humidity: ${uvi.daily[0].humidity} %`
    document.querySelector(`#fhumid2`).innerHTML  = `Humidity: ${uvi.daily[1].humidity} %`
    document.querySelector(`#fhumid3`).innerHTML  = `Humidity: ${uvi.daily[2].humidity} %`
    document.querySelector(`#fhumid4`).innerHTML  = `Humidity: ${uvi.daily[3].humidity} %`
    document.querySelector(`#fhumid5`).innerHTML  = `Humidity: ${uvi.daily[4].humidity} %`

    storePrevious(city)

}
 
function storePrevious(city) {
    //add most recently searched city to previously searched cities
    console.log(`store ${city}`)
    // create array of previous searches
    
    // if previous already exists, open the array
    if (localStorage.getItem('previous') === null) {
        previous = []
    } else {
        previous  = JSON.parse(localStorage.getItem('previous'));
    } 
    // add city to array
    addCity = {
        search: `${city}`
    }
    previous.push(addCity)
    // set length of for loop
    previouslgth = previous.length
    //avoid duplicates on list
    // for ( i=0; i< previous.length; i++)
    // if( previous[i].search === `${city}`){ 
    //     localStorage.removeItem('previous',  [i])  
    // } else {
    //     previous.push(addCity)   
    // }
    //add the updated array to local storage
    localStorage.setItem( 'previous', JSON.stringify(previous) );
    
    //clear search bar and note in console log
    console.log("clearing search area")
    document.querySelector("#city-search").value = ""
    displayPrevious()
}
function displayPrevious(){
    //get array from local storage
    previous = JSON.parse(localStorage.getItem('previous'))
    //create for loop
    
    for ( i=0; i < 8; i++){
    //name previous searches
    var old = previous[i].search
    //populate HTML with data
    document.querySelector("#past-search").innerHTML += `<li class="list-group-item" id="previous"><button type="button" class="btn" id="pvsBtn" onclick="pvsSearch(${old})" >${old}</li>`
    }

}
function pvsSearch(old) {
    console.log("previous search activated")
    doSearch(old)

}
    
    
        
    


    
   