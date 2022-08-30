const cityLabel = document.querySelector(".city")
const descriptionLabel = document.querySelector(".description")
const temperatureLabel = document.querySelector(".temperature");
const humidityLabel = document.querySelector(".humidity")
const windLabel = document.querySelector(".wind")
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
        const {description} = data.weather[0];
        const {temp, humidity} = data.main 
        const {speed} = data.wind
        cityLabel.innerText = `Weather in ${name}`;
        descriptionLabel.innerText = `${description}`;
        temperatureLabel.innerText = `${temp} °C`;
        humidityLabel.innerText = `Humidity: ${humidity} %`;
        windLabel.innerText = `Wind: ${speed} km/h`;
        
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

  