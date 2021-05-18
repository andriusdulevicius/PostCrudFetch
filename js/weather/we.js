'use strict'; // here we go again
import { appId } from './variables.js';
// const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const city = 'vilnius';
const weatherUrl = '/js/weather/sample.json';

const weatherEl = document.getElementById('weather');

async function getWetherData() {
    const url = `${weatherUrl}?q=${city}&units=metric&appid=${appId}&lang=lt`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
}

getWetherData()
    .then((data) => drawOras(data))
    .catch((err) => console.error(err.message));

function drawOras(data) {
    console.log('data', data);
    const {
        main: { temp_max, temp_min, temp, humidity },
        weather,
    } = data;
    const widgetEl = document.createElement('article');
    widgetEl.className = 'widget';
    const orasImg = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    widgetEl.innerHTML = `
              <select name="weather" id="city-weather">
              <option value="Vilnius">Vilnius</option>
              <option value="Kaunas">Kaunas</option>
              <option value="Siauliai">Siauliai</option>  
            </select>
            <div class="weatherIcon"><img src="${orasImg}" />
            </div>
            <div class="weatherInfo">
                <div class="temperature"><span>${temp}&deg;</span></div>
                <div class="description">
                <div class="weatherCondition">${weather[0].description}</div>
                <div class="place">Min: ${temp_min}&deg;, Max: ${temp_max}&deg; Dregme: ${humidity}%</div>
                </div>
            </div>
            <div class="date">Vejas: N ${data.wind.speed} m/s</div>
        `;
    weatherEl.append(widgetEl);
}

// 1 padaryti select lauka su bent trim miestais

// 2 pasirinkus miesta iskarto atsinaujina musu oru blokas

// 3 prideti kada teka ir leidziasi saule laika normaliu formatu

// 4 uzd pasidaryti kad orai butu oop arba susiskaidy i
// atskiras funkcijas ir importuoti exportuoti kad veiktu

// 5 paieskoti ar yra budas ikelti css faila i html
// jei yra tai weather css turetu isikelti dinamiskai
