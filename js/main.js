let country = document.getElementById('search')
let btn = document.getElementById('search-btn')
let result = document.getElementById('card-result')
let card = document.querySelector('.card')

const weather = async () => {
    let countryValue = country.value
    card.classList.remove('active')
    result.classList.remove('active')
    if(countryValue.length === 0) {
        card.classList.add('active')
        result.classList.add('active')
        result.innerHTML = `
        <h1 class="nonValue">The input field is empty</h1>
        `
    } else {
        card.classList.remove('active')
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${countryValue}&appid=${key}&units=metric`;
        if(url) {
            console.log(123);
        }
        await fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                let temp = Math.round(data.main.temp)
                let tempMax = Math.round(data.main.temp_max)
                let tempMin = Math.round(data.main.temp_min)
                let windSpeed = Math.round(data.wind.speed)
                card.classList.add('active')
                result.classList.add('active')
                result.innerHTML = `
                <h1 class="country-name">${data.name}</h1>
                <div class="wrapper-tem">
                    <img class="wrapper-tem-img" src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png">
                    <span class="main-temp">${temp}°C</span>
                    <div class="wrapper-tem__info">
                        <span class="wrapper-tem__info-max">max <br> ${tempMax}°C</span>
                        <span class="wrapper-tem__info-min">min <br> ${tempMin}°C</span>
                    </div>
                </div>
                <div class="wrapper__info">
                    <p>${data.weather[0].main}: ${data.weather[0].description}</p>
                    <p class="wrapper__info__speed">Wind: ${windSpeed} km/h</p>
                    <p class="wrapper__info__hum">Humidity: ${data.main.humidity}%</p>
                </div>
                `
            })
            .catch(() => {
                card.classList.add('active')
                result.classList.add('active')
                result.innerHTML = `
                <h1 class="error">This city/country is not finded</h1>
                `
            })
        }  
}
btn.addEventListener('click', weather)
// window.addEventListener('load', weather)