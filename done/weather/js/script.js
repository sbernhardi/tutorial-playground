let searchInp = document.querySelector(".weather__search");
let city = document.querySelector(".weather__city");
let day = document.querySelector(".weather__day");

// select child with ">"
let humidity = document.querySelector(".weather__indicator--humidity>.value");
let wind = document.querySelector(".weather__indicator--wind>.value");
let pressure = document.querySelector(".weather__indicator--pressure>.value");
let image = document.querySelector(".weather__image");
let temperature = document.querySelector(".weather__temperature>.value");

let forecastBlock = document.querySelector(".weather__forecast");

let weatherAPIKey = "e4e1dc89ad0c913013797ee86acac38c";

let weatherBaseEndpoint = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + weatherAPIKey;
let forecastBaseEndpoint = "https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=" + weatherAPIKey;

let geocodingBaseEndpoint = "http://api.openweathermap.org/geo/1.0/direct?limit=5&appid=" + weatherAPIKey + "&q=";
let datalist = document.getElementById("suggestions");

let weatherImages = [
	{
		url: "assets/images/clear-sky.png",
		ids: [800], 
        icon: "01d"
	},
	{
		url: "assets/images/few-clouds.png",
		ids: [801], 
        icon: "02d"
	},
	{
		url: "assets/images/scattered-clouds.png",
		ids: [802], 
        icon: "03d"
	},
	{
		url: "assets/images/broken-clouds.png",
		ids: [803,804], 
        icon: "04d"
	},
	{
		url: "assets/images/shower-rain.png",
		ids: [300, 301, 302, 310, 311, 312, 313, 314, 321, 520, 521, 522, 531], 
        icon: "09d"
	},
	{
		url: "assets/images/rain.png",
		ids: [500, 501, 502, 503, 504], 
        icon: "10d"
	},
	{
		url: "assets/images/thunderstorm.png",
		ids: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232], 
        icon: "11d"
	},
	{
		url: "assets/images/snow.png",
		ids: [511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622], 
        icon: "13d"
	},
	{
		url: "assets/images/mist.png",
		ids: [701, 711, 721, 731, 741, 751, 761, 762, 771], 
        icon: "50d"
	}
]



let getWeatherByCityName = async (city) => {
    let endpoint = weatherBaseEndpoint + "&q=" + city;
    let response = await fetch(endpoint);
    let weather = await response.json();
    return weather;
}

let getForecastByCityID = async (id) => {
    let endpoint = forecastBaseEndpoint + "&id=" + id;
    let result = await fetch (endpoint);
    let forecast = await result.json();
    let forecastList = forecast.list;
    let daily = [];

    forecastList.forEach(day => {
        let date  = new Date(day.dt_txt.replace(" ", "T"));
        let hours = date.getHours();
        if(hours==12) daily.push(day);
    });
    return daily;
}

let weatherForCity = async (city) => {
    let weather = await getWeatherByCityName(city);
    if(weather.code === "404") return;
    let cityID = weather.id;
    updateCurrentWeather(weather);
    let forecast = await getForecastByCityID(cityID);
    updateForecast(forecast);
}

searchInp.addEventListener('keydown', async (e) => {
    if(e.keyCode === 13 /*Alternative: e.key === "Enter"*/){
        weatherForCity(searchInp.value);   
    }
});

searchInp.addEventListener('input', async() => {
    if(searchInp.value.length <= 2) return;
    let endpoint = geocodingBaseEndpoint + searchInp.value;
    let result = await (await fetch(endpoint)).json();
    datalist.innerHTML = "";
    result.forEach((city) => {
        let option = document.createElement("option");
        option.value = `${city.name}${city.state ? ", "+city.state : ""}, ${city.country}`;
        datalist.appendChild(option);
    });

});

let updateCurrentWeather = (data) => {
    city.textContent = data.name + ", " + data.sys.country;
    day.textContent = dayOfWeek();
    humidity.textContent = data.main.humidity;
    pressure.textContent = data.main.pressure;

    let windDirection;
    let deg = data.wind.deg;
    if(deg > 45 && deg <= 135) windDirection = "East";
    else if(deg > 135 && deg <= 225) windDirection = "South";
    else if(deg > 225 && deg <= 315) windDirection = "West";
    else windDirection = "North";

    wind.textContent = windDirection + ", " + data.wind.speed;

    temperature.textContent = data.main.temp > 0
                    ? "+" + Math.round(data.main.temp)
                    : Math.round(data.main.temp);

    let imgID = data.weather[0].id;
    weatherImages.forEach(obj => {
        if(obj.ids.includes(imgID)) image.src = obj.url;
    });
}

let updateForecast = (forecast) => {
    forecastBlock.innerHTML = "";
    forecast.forEach(day => {
        let iconUrl;
        weatherImages.forEach(obj => {
            if(obj.icon === day.weather[0].icon) iconUrl = obj.url;
        });
        let dayName = dayOfWeek(day.dt * 1000);
        let temperature = day.main.temp > 0
                    ? "+" + Math.round(day.main.temp)
                    : Math.round(day.main.temp);
        let forecastItem = `
            <article class="weather__forecast__item">
                <img src="${iconUrl}" alt="${day.weather[0].description}" class="weather__forecast__icon">
                <h3 class="weather__forecast__day">${dayName}</h3>
                <p class="weather__forecast__temperature"><span class="value">${temperature}</span>&deg;C</p>
            </article>
        `;

        forecastBlock.insertAdjacentHTML("beforeend", forecastItem);
    });

}

let dayOfWeek = (dt = new Date().getTime()) => {
    return new Date(dt).toLocaleDateString("en-EN", {"weekday": "long"});
}

let init = async () => {
    await weatherForCity("Berlin");
    document.body.style.filter = "blur(0)";
}

init();