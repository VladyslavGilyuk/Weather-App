const cityLabel = document.querySelector(".city")
const descriptionLabel = document.querySelector(".description")
const iconLabel = document.querySelector(".icon")
const temperatureLabel = document.querySelector(".temperature");
const humidityLabel = document.querySelector(".humidity")
const windLabel = document.querySelector(".wind")
const sunriseLabel = document.querySelector(".sunrise")
const sunsetLabel = document.querySelector(".sunset")
const searchButton = document.querySelector(".search button")
const searchBar = document.querySelector(".search-bar")

let weather = {
    apiKey: "bc7e2642f5596bb54e62501b2da573c3",
    fetchWeather: function (city) {
        fetch (
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city + "&units=metric&appid=" + this.apiKey
        )
        .then((response) => {
        if (!response.ok) {
            alert("No weather found")
        } else {
            return response.json();
        }})
        .then((data) => this.displayWeather(data));
        },
    displayWeather: function(data) {
        const {name} = data 
        const {country, sunrise, sunset} = data.sys
        const {description, icon} = data.weather[0];
        const {temp, humidity} = data.main 
        const {speed} = data.wind
        cityLabel.innerText = `Weather in ${name}, ${country}`;
        iconLabel.src = `https://openweathermap.org/img/wn/${icon}.png`;
        descriptionLabel.innerText = `${description}`;
        temperatureLabel.innerText = `${Math.floor(temp)} °C`;
        humidityLabel.innerText = `Humidity: ${humidity} %`;
        windLabel.innerText = `Wind: ${speed} km/h`;
        sunriseLabel.innerText = `Sunrise: ${new Date(1000* sunrise).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        sunsetLabel.innerText = `Sunset: ${new Date(1000* sunset).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        
        document.body.style.backgroundImage =
        `url("https://source.unsplash.com/1600x900/?${name})"`;
    },
    search: function () {
        this.fetchWeather(searchBar.value)
    },
};

searchButton.addEventListener("click", function () {
    weather.search();
  });

  searchBar.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Kyiv");

  