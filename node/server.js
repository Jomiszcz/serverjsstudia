const http = require('http');
// console.log(http);
const port = 3000

http.createServer((req, res) => {

    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write('<h1>Strona główna</h1>');
        res.end();
    } else if (req.url === '/form') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write('<h1>Formularz rejestracyjny</h1>');
        res.end();
    } else if (req.url === '/api') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write('<h1>Aplikacja pogodowa</h1>');
        res.end();
    }


}).listen(port, () => {
    console.log(`Serwer działa i nasłuchuje na porcie ${port}`);
});