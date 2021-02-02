


async function doSearch(city){
    event.preventDefault()
    
    console.log( `[doSearch] search(${city})` )

    //search openWeather for info
    await fetch ( "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=7cc8c49decf9f1dad6cc72eebd7c1304&units=imperial").then( r=>r.json()).then(data =>{
        console.log (`..weatherData: `, data)

        document.querySelector("#past-search").innerHTML += `
        <li class="list-group-item">${data.name}</li>`
    
        document.querySelector("#weatherInfo").innerHTML = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">Temperature: ${data.main.temp}</p>
                <p class="card-text">Humidity: ${data.main.humidity}</p>
                <p class="card-text">Wind Speed: ${data.wind.speed}</p>
            </div>
        </div>`
    } )  
}

document.querySelector("#schBtn").addEventListener("click",function(){
    var city = document.querySelector('#city-search').value
    document.querySelector("#city-search").innerHTML = ''
    doSearch(city)
})

asynch function findUV(){
    var lat = data.coord.lat 
    var lon = data.coord.lon

    await fetch( "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly,alerts&appid=7cc8c49decf9f1dad6cc72eebd7c1304&units=imperial").then ( r=> r.json()).then (uvindex => {
        console.log(`..UV index`, uvindex)

        document.querySelector("#weatherInfo").innerHTML =`
        <p class="card-text">UV index: ${uvindex.daily.uvi}</p> 
        `
        )
}
