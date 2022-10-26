const express = require('express');
//express app
const app = express(); //Es wird eine INstanz von FrameWork Express vom Typ App erstellt



//Listen for Request
app.listen(3000);

app.get('/', (req, res) => { //I want here to Listen to The Page '/'
    //Send is an Express Methode
    // res.send('<p> Home Page </p>'); //Habe es auskommentiert, ansonsten hätten wir die SendFile Methode nicht angezeigt bekommen.
    //Aufruf bei Express lautet nodemon
    //Nodemon Express reagiert schneller, also da braucht man nicht nach jeder Änderung was zu ändern
    //Jetzt mache wir es aber mit file.
    res.sendFile('./view/myIndex.html', { root: __dirname }); //Root ist Projekt Name also hier Node-Tutorium
});
app.get('/about', function getPageAbouts(req, res) {
    res.sendFile('./view/about.html', { root: __dirname });

});
//redirects
//Das heisst beim Aufruf von about-us wird automatisch die Page about angezeigt. 
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});
//Redirect 404 Error
//Use Methode funktioniert genauso wie default CASE, also es wird alle cases überprüft und wenn keiner eingetroffen ist, wird die 404 ERROR Page eingeworfen
app.use((req, res) => {
    res.sendFile('./view/404.html', { root: __dirname });
});
//Nächste schritt ist <npm install ejs>
//ejs view engine macht die HTML Seite dynamisch