const http = require('http');
const fs = require('fs');
const port = 3000
const path = require('path');


http.createServer((req, res) => {

    if (req.url === '/obrazek') {
    fs.readFile(path.join(__dirname, 'jakoscpowietrza.png'), (err, data) => {
        if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Nie znaleziono obrazka');
        return;
        }
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(data);
    });
    return;
    }

    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(`
        <!DOCTYPE html>
        <html lang="pl">
        <head>
            <meta charset="UTF-8">
            <title>Strona główna</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    background: linear-gradient(to bottom, rgb(155, 231, 182), rgb(175, 231, 245));
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-height: 100vh;
                }

                .main_box {
                    background-color: white;
                    padding: 30px;
                    margin-top: 40px;
                    border-radius: 20px;
                    box-shadow: 0 0 20px rgb(4, 46, 2);
                    text-align: center;
                    width: 90%;
                    max-width: 500px;
                }

                h1 {
                    color: rgb(22, 95, 4);
                    margin-bottom: 30px;
                }

                .buttons {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 20px;
                }

                a.button_link {
                    background-color: rgb(12, 95, 12);
                    color: white;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 10px;
                    font-weight: bold;
                    transition: background-color 0.3s;
                }

                a.button_link:hover {
                    background-color: rgb(8, 85, 12);
                }

                footer {
                    margin-top: auto;
                    padding: 10px;
                    color: #666;
                    font-size: 0.8em;
                }
            </style>
        </head>
        <body>
            <div class="main_box">
                <h1>Strona główna</h1>
                <div class="buttons">
                    <a href="/form" class="button_link">Formularz</a>
                    <a href="/api" class="button_link">Aplikacja pogodowa</a>
                </div>
            </div>
            <footer>
                <p>Karol Popławski - Projekt WSB Gdańsk 2025</p>
            </footer>
        </body>
        </html>
        `);
    } else if (req.url === '/form') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
        <!DOCTYPE html>
        <html lang="pl">
        <head>
            <meta charset="UTF-8">
            <title>Walidacja Formularza</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    background: linear-gradient(to bottom,rgb(155, 231, 182),rgb(175, 231, 245));
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-height: 100vh;
                }

                h1 {
                    margin-top: 40px;
                    color:rgb(22, 95, 4);
                }

                form {
                    background-color: white;
                    padding: 30px;
                    margin-top: 20px;
                    border-radius: 20px;
                    box-shadow: 0 0 20px rgb(4, 46, 2);
                    width: 90%;
                    max-width: 500px;
                }

                .form_box {
                    margin-bottom: 20px;
                }

                label {
                    display: block;
                    margin-bottom: 6px;
                    font-weight: bold;
                    color: #333;
                }

                input[type="text"],
                input[type="email"],
                input[type="password"] {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #bbb;
                    border-radius: 8px;
                    box-sizing: border-box;
                }

                .buttons {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                }

                input[type="submit"],
                input[type="reset"] {
                    background-color:rgb(12, 95, 12);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: background-color 0.3s;
                }

                input[type="submit"]:hover,
                input[type="reset"]:hover {
                    background-color:rgb(8, 85, 12);
                }

                p.error_message {
                    color: darkred;
                    margin: 5px 0 0 0;
                    font-size: 0.9em;
                }

                footer {
                    margin-top: auto;
                    padding: 10px;
                    color: #666;
                    font-size: 0.8em;
                }
                    .back_button {
                    margin: 30px 0;
                    text-align: center;
                }

                a.button_link {
                    background-color: rgb(12, 95, 12);
                    color: white;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 10px;
                    font-weight: bold;
                    transition: background-color 0.3s;
                }

                a.button_link:hover {
                    background-color: rgb(8, 85, 12);
                }
            </style>
        </head>
        <body>
            <h1>Walidacja formularza</h1>
            <form>
                <div class="form_box">
                    <label for="username">Nazwa użytkownika:</label>
                    <input type="text" id="username" placeholder="Podaj nazwę użytkownika" required>
                    <p class="error_message"></p>
                </div>

                <div class="form_box">
                    <label for="email">E-mail:</label>
                    <input type="email" id="email" placeholder="Podaj adres e-mail" required>
                    <p class="error_message"></p>
                </div>

                <div class="form_box">
                    <label for="pwd1">Hasło:</label>
                    <input type="password" id="pwd1" placeholder="Podaj hasło" required>
                    <p class="error_message"></p>
                </div>

                <div class="form_box">
                    <label for="pwd2">Powtórz hasło:</label>
                    <input type="password" id="pwd2" placeholder="Powtórz hasło" required>
                    <p class="error_message"></p>
                </div>

                <div class="buttons">
                    <input type="submit" value="Zatwierdź" class="submit">
                    <input type="reset" value="Resetuj" class="reset">
                </div>
            </form>
            <div class="back_button">
                <a href="/" class="button_link">Powrót do strony głównej</a>
            </div>
            <footer>
                <p>Karol Popławski - Projekt WSB Gdańsk 2025</p>
            </footer>

            <script>
                const userName = document.querySelector("input#username");
                const email = document.querySelector("input#email");
                const password1 = document.querySelector("input#pwd1");
                const password2 = document.querySelector("input#pwd2");
                const resetBtn = document.querySelector("input.reset");
                const submitBtn = document.querySelector("input.submit");

                function showOrHideErrorMessage(input, message) {
                    const errorMessage = input.nextElementSibling;
                    errorMessage.textContent = message;
                }

                function clearErrorMessage(input) {
                    const errorMsg = input.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains("error_message")) {
                        errorMsg.textContent = "";
                    }
                }

                function checkPasswordValue() {
                    if (password1.value !== password2.value) {
                        showOrHideErrorMessage(password2, "Hasła nie są jednakowe.");
                    } else {
                        clearErrorMessage(password2);
                    }
                }

                function checkInputLength(input, minLength) {
                    if (input.value.length < minLength) {
                        showOrHideErrorMessage(input, \`Pole powinno zawierać przynajmniej \${minLength} znaków.\`);
                    } else {
                        showOrHideErrorMessage(input, '');
                    }
                }

                submitBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    checkInputLength(userName, 5);
                    checkInputLength(password1, 8);
                    checkPasswordValue();
                });

                resetBtn.addEventListener('click', () => {
                    document.querySelectorAll(".error_message").forEach(errorMsg => {
                        errorMsg.textContent = "";
                    });
                });
            </script>
        </body>
        </html>
        `);
    } else if (req.url === '/api') {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
        <!DOCTYPE html>
        <html lang="pl">
        <head>
            <meta charset="UTF-8">
            <title>Aplikacja pogodowa</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    background: linear-gradient(to bottom,rgb(155, 231, 182),rgb(175, 231, 245));
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                header h1 {
                    margin-top: 40px;
                    color:rgb(22, 95, 4);
                }

                .search {
                    margin-top: 20px;
                    text-align: center;
                }

                .search input {
                    padding: 10px;
                    border-radius: 8px;
                    border: 1px solid #bbb;
                    width: 250px;
                    max-width: 80%;
                    margin-right: 10px;
                }

                .search button {
                    padding: 10px 20px;
                    background-color:rgb(25, 133, 30);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-weight: bold;
                    cursor: pointer;
                }

                .search button:hover {
                    background-color:rgb(18, 85, 12);
                }

                .weather, .air_pollution {
                    background-color: white;
                    margin-top: 30px;
                    padding: 20px;
                    border-radius: 20px;
                    box-shadow: 0 0 20px rgba(16, 77, 19, 0.9);
                    width: 90%;
                    max-width: 500px;
                }

                .weather div {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .weather_img, .pollution_img {
                    width: 50px;
                    height: 50px;
                }

                .value {
                    font-weight: bold;
                    font-size: 1.5em;
                    margin: 0 10px;
                }

                footer {
                    margin: 40px 0 10px;
                    color: #666;
                    font-size: 0.8em;
                }

                p.error_message {
                    color: darkred;
                }
                    .back_button {
                    margin: 30px 0;
                    text-align: center;
                }

                a.button_link {
                    background-color: rgb(12, 95, 12);
                    color: white;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 10px;
                    font-weight: bold;
                    transition: background-color 0.3s;
                }

                a.button_link:hover {
                    background-color: rgb(8, 85, 12);
                }
            </style>
        </head>
        <body>
            <header>
                <h1>Aplikacja pogodowa</h1>
            </header>
            <main>
                <section class="search">
                    <input type="text" placeholder="Podaj nazwę miasta">
                    <button>Sprawdź pogodę</button>
                    <p class="error_message"></p>
                </section>
                <section class="weather">
                    <h2 class="city_name"></h2>
                    <div>
                        <img src="" alt="X" class="weather_img">
                        <span class="temp"></span>
                    </div>
                    <p class="weather_description"></p>
                    <p>Temperatura odczuwalna: <span class="feels_like"></span></p>
                    <p>Wilgotność: <span class="humidity"></span></p>
                    <p>Ciśnienie: <span class="pressure"></span></p>
                    <p>Prędkość wiatru: <span class="wind_speed"></span></p>
                    <p>Zachmurzenie: <span class="clouds"></span></p>
                    <p>Widoczność: <span class="visibility"></span></p>
                </section>
                <section class="air_pollution">
                    <h3>Zanieczyszczenie powietrza</h3>
                    <div>
                        <img src="/obrazek" alt="PM2.5" class="pollution_img">
                        <span class="value"></span>
                        <span>&micro;g/m<sup>3</sup></span>
                    </div>
                </section>
            </main>
            <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
            <script>
                const input = document.querySelector('input');
                const button = document.querySelector('button');
                const errorMsg = document.querySelector('p.error_message');
                const cityName = document.querySelector('h2.city_name');
                const weatherImg = document.querySelector('img.weather_img');
                const temp = document.querySelector('span.temp');
                const weatherDescription = document.querySelector('p.weather_description');
                const feelsLike = document.querySelector('span.feels_like');
                const humidity = document.querySelector('span.humidity');
                const pressure = document.querySelector('span.pressure');
                const windSpeed = document.querySelector('span.wind_speed');
                const clouds = document.querySelector('span.clouds');
                const visibility = document.querySelector('span.visibility');
                const pollutionImg = document.querySelector('img.pollution_img');
                const pollutionValue = document.querySelector('span.value');

                const apiInfo = {
                    link: 'https://api.openweathermap.org/data/2.5/weather?q=',
                    airPollutionLink: 'https://api.openweathermap.org/data/2.5/air_pollution?lat=',
                    key: '&appid=e3d33a524e4953ba7aae6cd080419b23',
                    units: '&units=metric',
                    lang: '&lang=pl',
                }

                const getWeather = () => {
                    const apiInfoCity = input.value;
                    const apiURL = \`\${apiInfo.link}\${apiInfoCity}\${apiInfo.key}\${apiInfo.units}\${apiInfo.lang}\`;

                    axios.get(apiURL).then((response) => {
                        cityName.textContent = \`\${response.data.name}, \${response.data.sys.country}\`;
                        weatherImg.src = \`https://openweathermap.org/img/wn/\${response.data.weather[0].icon}@2x.png\`;
                        temp.textContent = \`\${Math.round(response.data.main.temp)}°C\`;
                        weatherDescription.textContent = response.data.weather[0].description;
                        feelsLike.textContent = \`\${Math.round(response.data.main.feels_like)}°C\`;
                        humidity.textContent = \`\${response.data.main.humidity}%\`;
                        pressure.textContent = \`\${response.data.main.pressure} hPa\`;
                        windSpeed.textContent = \`\${Math.round(response.data.wind.speed)} m/s\`;
                        clouds.textContent = \`\${response.data.clouds.all}%\`;
                        visibility.textContent = \`\${response.data.visibility / 1000} km\`;
                        errorMsg.textContent = '';

                        const lat = response.data.coord.lat;
                        const lon = response.data.coord.lon;
                        const pollutionURL = \`\${apiInfo.airPollutionLink}\${lat}&lon=\${lon}\${apiInfo.key}\`;

                        axios.get(pollutionURL).then((pollutionResponse) => {
                            const pm25 = pollutionResponse.data.list[0].components.pm2_5;
                            pollutionValue.textContent = \`\${Math.round(pm25)}\`;

                            if (pm25 < 10) {
                                pollutionImg.style.backgroundColor = "green"; 
                            } else if (pm25 >= 10 && pm25 < 25) {
                                pollutionImg.style.backgroundColor = "yellowgreen";  
                            } else if (pm25 >= 25 && pm25 < 50) {
                                pollutionImg.style.backgroundColor = "yellow";  
                            } else if (pm25 >= 50 && pm25 < 75) {
                                pollutionImg.style.backgroundColor = "orange"; 
                            } else if (pm25 >= 75) {
                                pollutionImg.style.backgroundColor = "red";  
                            }
                        });
                    }).catch(error => {
                        errorMsg.textContent = \`\${error.response?.data?.message || 'Błąd'}\`;
                        [cityName, temp, weatherDescription, feelsLike, pressure, humidity, clouds, visibility, pollutionValue, windSpeed].forEach(el => {
                            el.textContent = '';
                        });
                        weatherImg.src = '';
                        pollutionImg.style.backgroundColor = 'transparent';
                    }).finally(() => {
                        input.value = '';
                    });
                }

                button.addEventListener('click', getWeather);
            </script>
            <div class="back_button">
                <a href="/" class="button_link">Powrót do strony głównej</a>
            </div>
            <footer>
                <p>Karol Popławski - Projekt WSB Gdańsk 2025</p>
            </footer>
        </body>
        </html>
        `);
    } else {
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.write('<h1>Błąd 404</h1>')
        res.write('<p>Strona nie istnieje</p>');
        res.end();
    }

}).listen(port, () => {
    console.log(`Serwer działa i nasłuchuje na porcie ${port}`);
});