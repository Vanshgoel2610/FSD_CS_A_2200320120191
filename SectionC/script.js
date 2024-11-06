const weatherForm = document.querySelector('.weatherForm')
const cityInput = document.querySelector('.cityInput')
const card = document.querySelector('.card')
const apiKey = "4221d0252ef71411bf63d40bd57ef153";

weatherForm.addEventListener('submit', async event => {
    event.preventDefault()
    const city = cityInput.value;
    if(city) {
        const weatherData = await getWeatherData(city)
        displayWeatherInfo(weatherData)
    } else displayError("Enter a city")
})

async function getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    if(!response.ok) throw new Error("Could not fetch the weather data of the city")
    return await response.json()
}

function displayWeatherInfo(data) {
    const {name: city,
        main: {temp, humidity},
        weather: [{description, id}]} = data

    card.textContent = ''
    card.style.display = 'flex'
    const cityDisplay = document.createElement('h1')
    const tempDisplay = document.createElement('p')
    const humidityDisplay = document.createElement('p')
    const descDisplay = document.createElement('p')
    const weatherEmoji = document.createElement('p')
        
    cityDisplay.textContent = city
    tempDisplay.textContent = `${(temp-273.15).toFixed(1)}C`
    humidityDisplay.textContent = `Humidity: ${humidity}`
    descDisplay.textContent = description
    weatherEmoji.textContent = getEmoji(id)
    console.log(id)

    cityDisplay.classList.add('cityDisplay')
    tempDisplay.classList.add('tempDisplay')
    humidityDisplay.classList.add('humidityDisplay')
    descDisplay.classList.add('descDisplay')
    weatherEmoji.classList.add('weatherEmoji')

    card.appendChild(cityDisplay)
    card.appendChild(tempDisplay)
    card.appendChild(humidityDisplay)
    card.appendChild(descDisplay)
    card.appendChild(weatherEmoji)
}

function getEmoji(id) {
    switch(true) {
        case (id >= 200 && id < 300): {
            document.querySelector('.parent').style.backgroundImage = "url('thunder.jpg')";
            document.querySelector('.parent').classList.remove('parent');
            return '⛈️';
        }
        case (id >= 300 && id < 400): {
            document.querySelector('.parent').style.background = 'hsl(209, 78%, 70%)';
            return '🌧️';
        }
        case (id >= 500 && id < 600): {
            document.querySelector('.parent').style.background = 'hsl(209, 78%, 75%)';
            return '🌧️';
        }
        case (id >= 600 && id < 700): {
            document.querySelector('.parent').style.background = 'hsl(192, 76%, 77%)';
            return '❄️';
        }
        case (id >= 700 && id < 800): {
            document.querySelector('.parent').style.background = 'hsl(0, 0%, 60%)';
            return '🌫️';
        }
        case (id === 800 ): {
            document.querySelector('.parent').style.background = 'linear-gradient(300deg, hsl(204, 82%, 63%), hsl(40, 100%, 50%))'
            return '☀️';
        }
        case (id > 800 && id < 810): {
            document.querySelector('.parent').style.background = 'linear-gradient(300deg, hsl(0, 1%, 18%), hsl(0, 1%, 49%))';
            return '☁️';
        }
        default: 
            return '❓'
    }
}

function displayError(msg) {
    const para = document.createElement('p')
    para.textContent = msg
    para.classList.add('errorDisplay')
    card.textContent = ''
    card.style.display = 'flex'
    card.appendChild(para)
}