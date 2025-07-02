const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

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
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
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
                    font-family: 'Segoe UI', sans-serif;
                    background: linear-gradient(to bottom, rgb(155, 231, 182), rgb(175, 231, 245));
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }
                header {
                    background-color: rgba(255, 255, 255, 0.85);
                    padding: 20px;
                    text-align: center;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                }
                h1 {
                    margin: 0;
                    font-size: 2em;
                    color:rgb(22, 101, 52);
                    text-shadow: 1px 1px 2px rgba(4, 36, 14, 0.73);
                }
                main {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                    justify-items: center;
                    padding: 60px 40px;
                    flex-grow: 1;
                }

                .card {
                    background-color: white;
                    border-radius: 20px;
                    box-shadow: 0 0 15px rgba(4, 46, 2, 0.4);
                    padding: 30px;
                    width: 100%;
                    max-width: 400px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 200px;
                    transition: transform 0.3s;
                }

                .card:hover {
                    transform: translateY(-5px);
                }

                .card h2 {
                    color: rgb(22, 95, 4);
                }

                .card a {
                    background-color: rgb(12, 95, 12);
                    color: white;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 10px;
                    font-weight: bold;
                    transition: background-color 0.3s;
                    display: inline-block;
                    margin-top: 20px;
                }

                .card a:hover {
                    background-color: rgb(8, 85, 12);
                }

                footer {
                    text-align: center;
                    padding: 10px;
                    font-size: 0.8em;
                    color: #666;
                    background-color: rgba(255, 255, 255, 0.8);
                }

                @media (max-width: 768px) {
                    main {
                        grid-template-columns: 1fr;
                        padding: 20px;
                    }
                }
            </style>
        </head>
        <body>
            <header>
                <h1>Strona Główna</h1>
            </header>
            <main>
                <div class="card">
                    <h2>Formularz</h2>
                    <a href="/form">Przejdź</a>
                </div>
                <div class="card">
                    <h2>Aplikacja pogodowa</h2>
                    <a href="/api">Przejdź</a>
                </div>
            </main>
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
    <meta charset="UTF-8" />
    <title>Walidacja Formularza</title>
    <style>
    body {
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', sans-serif;
        background: linear-gradient(to bottom, rgb(155, 231, 182), rgb(175, 231, 245));
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    header {
        background-color: rgba(255, 255, 255, 0.85);
        padding: 20px;
        text-align: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    header h1 {
        margin: 0;
        font-size: 2em;
        color: rgb(22, 95, 4);
    }

    h1.page-title {
        margin-top: 40px;
        font-size: 1.5em;
        color: rgb(22, 95, 4);
        text-align: center;
    }

    form {
        background-color: white;
        padding: 30px;
        margin: 30px auto;
        border-radius: 20px;
        box-shadow: 0 0 20px rgba(4, 46, 2, 0.3);
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
        border-radius: 10px;
        box-sizing: border-box;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    input[type="submit"],
    input[type="reset"] {
        background-color: rgb(12, 95, 12);
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
        background-color: rgb(8, 85, 12);
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

    p.error_message {
        color: darkred;
        margin: 5px 0 0 0;
        font-size: 0.9em;
    }

    footer {
        text-align: center;
        padding: 10px;
        font-size: 0.8em;
        color: #666;
        background-color: rgba(255, 255, 255, 0.85);
        margin-top: auto;
    }
    </style>
    </head>
    <body>
        <header>
            <h1>Formularz rejestracji</h1>
        </header>
    <form>
        <div class="form_box">
        <label for="username">Nazwa użytkownika:</label>
        <input type="text" id="username" required />
        <p class="error_message"></p>
        </div>
        <div class="form_box">
        <label for="email">Adres e-mail:</label>
        <input type="email" id="email" required />
        <p class="error_message"></p>
        </div>
        <div class="form_box">
        <label for="pwd1">Hasło:</label>
        <input type="password" id="pwd1" required />
        <p class="error_message"></p>
        </div>
        <div class="form_box">
        <label for="pwd2">Powtórz hasło:</label>
        <input type="password" id="pwd2" required />
        <p class="error_message"></p>
        </div>
        <div class="buttons">
        <input type="submit" value="Zatwierdź" class="submit" />
        <input type="reset" value="Resetuj" class="reset" />
        </div>
    </form>
    <div class="back_button">
        <a href="/" class="button_link">Powrót do strony głównej</a>
    </div>
    <footer>
        Karol Popławski – Projekt WSB Gdańsk 2025
    </footer>

    <script>
        const userName = document.querySelector("#username");
        const email = document.querySelector("#email");
        const password1 = document.querySelector("#pwd1");
        const password2 = document.querySelector("#pwd2");
        const resetBtn = document.querySelector(".reset");
        const submitBtn = document.querySelector(".submit");

        function showOrHideErrorMessage(input, message) {
        input.nextElementSibling.textContent = message;
        }

        function clearErrorMessage(input) {
        input.nextElementSibling.textContent = "";
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
            showOrHideErrorMessage(input, \`Min. \${minLength} znaków.\`);
        } else {
            clearErrorMessage(input);
        }
        }

        submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        checkInputLength(userName, 5);
        checkInputLength(password1, 8);
        checkPasswordValue();
        });

        resetBtn.addEventListener("click", () => {
        document.querySelectorAll(".error_message").forEach(e => e.textContent = "");
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
    <meta charset="UTF-8" />
    <title>Aplikacja pogodowa</title>
    <style>
        body {
        margin: 0;
        font-family: 'Segoe UI', sans-serif;
        background: linear-gradient(to bottom, rgb(155, 231, 182), rgb(175, 231, 245));
        min-height: 100vh;
        color: #333;
        }

        header, footer {
        text-align: center;
        padding: 1rem;
        background-color: rgba(255, 255, 255, 0.85);
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        header h1 {
        margin: 0;
        font-size: 2em;
        color:rgb(22, 101, 52);
        text-shadow: 1px 1px 2px rgba(4, 36, 14, 0.73);
        }

        main {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        gap: 2rem;
        }

        section {
        background: rgba(255,255,255,0.75);
        backdrop-filter: blur(8px);
        border-radius: 20px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        padding: 2rem;
        width: 90%;
        max-width: 500px;
        }

        .search {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        }

        .search input {
        padding: 0.9rem;
        font-size: 1rem;
        border-radius: 12px;
        border: 1px solid #ccc;
        }

        .search button {
        padding: 0.9rem;
        font-size: 1rem;
        background-color:rgb(26, 127, 55);
        color: white;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.3s, transform 0.2s;
        }

        .search button:hover {
        background-color:rgb(20, 93, 42);
        transform: scale(1.03);
        }

        .error_message {
        color: darkred;
        text-align: center;
        font-weight: bold;
        }

        .weather div, .air_pollution div {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        margin: 1rem 0;
        flex-wrap: wrap;
        }

        .weather_img, .pollution_img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background-color: transparent;
        }

        footer {
        margin-top: auto;
        font-size: 0.85rem;
        color: #444;
        }
        .back_button { text-align: center; }

        .button_link {
        background-color:rgb(26, 127, 55);
        color: white;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 12px;
        font-weight: bold;
        transition: background-color 0.3s;
        }

        .button_link:hover {
        background-color:rgb(20, 93, 42);
        }
    </style>
    </head>
    <body>
    <header>
        <h1>Aplikacja pogodowa</h1>
    </header>
    <main>
        <section class="search">
        <input type="text" placeholder="Wpisz nazwę miasta" />
        <button>Sprawdź pogodę</button>
        <p class="error_message"></p>
        </section>

        <section class="weather">
        <h2 class="city_name"></h2>
        <div>
            <img src="" alt="Pogoda" class="weather_img" />
            <p class="weather_description"></p>
        </div>
        <p><strong>Temperatura:</strong> <span class="temp"></span></p>
        <p><strong>Odczuwalna:</strong> <span class="feels_like"></span></p>
        <p><strong>Wilgotność:</strong> <span class="humidity"></span></p>
        <p><strong>Ciśnienie:</strong> <span class="pressure"></span></p>
        <p><strong>Wiatr:</strong> <span class="wind_speed"></span></p>
        <p><strong>Zachmurzenie:</strong> <span class="clouds"></span></p>
        <p><strong>Widoczność:</strong> <span class="visibility"></span></p>
        </section>

        <section class="air_pollution">
        <h3>Zanieczyszczenie powietrza</h3>
        <div>
            <img src="/obrazek" alt="PM2.5" class="pollution_img" />
            <span class="value"></span>
            <span>&micro;g/m<sup>3</sup></span>
        </div>
        </section>
        <div class="back_button">
            <a href="/" class="button_link">Powrót do strony głównej</a>
        </div>
    </main>
    <footer>
        <p>Karol Popławski – Projekt WSB Gdańsk 2025</p>
    </footer>

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
        };

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
        };

        button.addEventListener('click', getWeather);
    </script>
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