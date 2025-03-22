const API_KEY = "8867d5002cb541b1a7022946252203";  // Use your WeatherAPI key

async function getWeather() {
    const location = document.getElementById("locationInput").value;
    const resultDiv = document.getElementById("weatherResult");

    if (!location) {
        resultDiv.innerHTML = `<p class="error">Please enter a location.</p>`;
        return;
    }

    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=yes`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            resultDiv.innerHTML = `<p class="error">${data.error.message}</p>`;
            return;
        }

        const { location, current } = data;
        
        resultDiv.innerHTML = `
            <h2>${location.name}, ${location.region}, ${location.country}</h2>
            <p>Local Time: ${location.localtime}</p>
            <p>Temperature: ${current.temp_c}°C (${current.temp_f}°F)</p>
            <p>Condition: ${current.condition.text}</p>
            <img src="https:${current.condition.icon}" alt="${current.condition.text}">
            <p>Humidity: ${current.humidity}%</p>
            <p>Wind: ${current.wind_kph} km/h (${current.wind_mph} mph) - ${current.wind_dir}</p>
            <p>Pressure: ${current.pressure_mb} mb</p>
            <p>Visibility: ${current.vis_km} km</p>
            <p>Air Quality:</p>
            <ul>
                <li>CO: ${current.air_quality.co} µg/m³</li>
                <li>NO2: ${current.air_quality.no2} µg/m³</li>
                <li>O3: ${current.air_quality.o3} µg/m³</li>
                <li>PM2.5: ${current.air_quality.pm2_5} µg/m³</li>
                <li>PM10: ${current.air_quality.pm10} µg/m³</li>
            </ul>
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p class="error">Failed to fetch weather data. Please try again.</p>`;
    }
}
