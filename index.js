const apiKey = "e9c0a8d29a2be036480737aac624d413";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const clothesIcon = document.querySelector(".clothes-icon");
const clothesIcon1 = document.querySelector(".clothes-icon1");
const clothesIcon2 = document.querySelector(".clothes-icon2");
const clothesIcon3 = document.querySelector(".clothes-icon3")

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "m/c";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        if (data.main.temp <= 0) {
            // одежда для холодной погоды
            clothesIcon.src = "images/14.png";
            clothesIcon1.src = "images/15.png";
            clothesIcon2.src = "images/21.png";
            clothesIcon3.src = "images/20.png";
        } else if (data.main.temp > 0 && data.main.temp <= 10) {
            // одежда для прохладной погоды
            clothesIcon1.src = "images/16.png";
            clothesIcon.src = "images/2.png";
            clothesIcon2.src = "images/22.png";
            clothesIcon3.src = "images/23.png";
        } else if (data.main.temp > 10 && data.main.temp <= 20) {
            // одежда для теплой погоды
            clothesIcon1.src = "images/1.png";
            clothesIcon.src = "images/3.png";
            clothesIcon2.src = "images/24.png";
            clothesIcon3.src = "images/25.png";
        } else if (data.main.temp > 20 && data.main.temp <= 30) {
            // одежда для жаркой погоды
            clothesIcon1.src = "images/13.png";
            clothesIcon.src = "images/17.png";
            clothesIcon2.src = "images/26.png";
            clothesIcon3.src = "images/27.png";
        } else {
            // одежда для очень жаркой погоды
            clothesIcon1.src = "images/19.png";
            clothesIcon.src = "images/18.png";
            clothesIcon2.src = "images/28.png";
            clothesIcon3.src = "images/29.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});