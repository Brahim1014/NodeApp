//Nächste schritt ist <npm install ejs>
//ejs view engine macht die HTML Seite dynamisch
const express = require('express');
//express app
const app = express();

//Register view Engine

app.set('view engine', 'ejs');
app.set('views', 'myViews'); //Wichtig:Wenn wir die File in anderer nicht Views Folder, müssen wir sowas schreiben, damit Express das Ordner findet


//Listen for Request
app.listen(3000);
app.get('/', (req, res) => {
    res.render('index', {title: 'Home'}); //mit res.render wird die Page index aufgerufen, wenn wir die Seit in Browser öffnen
});
app.get('/about', function getPageAbouts(req, res) {
    res.render('about');
});

//app.get('/about-us', (req, res) => { //Diese Methode bedeutet, dass im falle einer Aufruf von dem Link /about-us
//wird das Pagbe /about angezeigt....redirect
//Aber in Ejs brauchen redirect nicht mehr...deshalb Methode>>>auskommentieren
//res.redirect('/about');
//});

app.get('/blogs/create', (req, res) => {
res.render('create');
})
//404 Page
app.use((req, res) => {
    res.status(400).render('404');
});
