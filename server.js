const http = require('http');
const fs = require('fs');
const _ = require('lodash');
//Methode für Response und Request
const server = http.createServer((req, res) => {
    3
    console.log(req);

    console.log(req.url, req.method);
    //Lodash Anwendung
   // const num = _.random(0, 10);
   // console.log(num);
    res.setHeader('Content-type', 'text/html');
    let path = '/view/';
    switch (req.url) {
        case '/':
            path += 'myIndex.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        default:
            path += '404.html';
            res.statusCode = 400;
            break;
    }
    //es wird aufwendig und durcheinander, wenn wir unsere webseite so schreiben, daher sollte HTML angewendet werden
    //CODe auskommentieren und mit HTML ersetzen
    //res.write('<p> Hello, Brahim </p>');
    //Send an HTML file using READFILE
    fs.readFile(__dirname + path, 'utf8', (err, data) => {

        if (err) {
            console.log(err);
            res.end();
        }

        else {
            //res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        }
    })
}).listen(3000, 'localhost', () => {
    console.log("Listening for requests on port 3000");

});
