const apiKey = 'c71e6178b7d7d63818faf14230f802cb';

function getLocation() {
    if (navigator.geolocation) {
        showLoading();
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        showError({message: "Geolocation is not supported by this browser."});
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeatherData(`lat=${lat}&lon=${lon}`);
}

function getWeatherByCity() {
    const city = document.getElementById('locationInput').value;
    if (city) {
        showLoading();
        getWeatherData(`q=${city}`);
    } else {
        showError({message: "Please enter a location."});
    }
}

function getWeatherData(query) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                showError({message: data.message});
            }
        })
        .catch(error => showError(error));
}

function displayWeather(data) {
    hideLoading();
    document.getElementById('location').textContent = `Location: ${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('conditions').textContent = `Conditions: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('feelsLike').textContent = `Feels Like: ${data.main.feels_like}°C`;
    document.getElementById('pressure').textContent = `Pressure: ${data.main.pressure} hPa`;
    document.getElementById('visibility').textContent = `Visibility: ${data.visibility / 1000} km`;
    document.getElementById('weatherDisplay').style.display = 'block';
    document.getElementById('error').style.display = 'none';
}

function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('weatherDisplay').style.display = 'none';
    document.getElementById('error').style.display = 'none';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showError(error) {
    hideLoading();
    document.getElementById('error').textContent = `Error: ${error.message}`;
    document.getElementById('error').style.display = 'block';
}
