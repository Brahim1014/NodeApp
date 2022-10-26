//Nächste schritt ist <npm install ejs>
//ejs view engine macht die HTML Seite dynamisch
const express = require('express');
//express app
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog'); //Blog file Importieren
const { result } = require('lodash');
const { render } = require('ejs');
const blogRoutes=require('./routes/blogRoutes');
//const { result } = require('lodash');
//Connect to MongoDB
const dbUrl = 'mongodb+srv://netbrahim:Abbad,1998@nodeapp.sajgrzi.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))

    .catch((err) => console.log(err));

//Register view Engine

app.set('view engine', 'ejs');
app.set('views', 'myViews'); //Wichtig:Wenn wir die File in anderer nicht Views Folder, müssen wir sowas schreiben, damit Express das Ordner findet


//Listen for Request

//Miiddleware & Static Files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); //Pass die eingegebenen Daten in webBrowser ohne diese Methode wird die Eingaben nicht eingelesen oder gespeichert bzw. ausgegeben
app.use(morgan('dev'));
//Erklärung dieser Methode: wenn wir die /add-blog in Browser öffnen, bekommen wir unsere Daten in Browser angezeigt
app.get('/add-blog', (req, res) => {
    //Erzeugen ein Objekt vom Typ Blog
    const myBlog = new Blog({
        title: 'new blog 3',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });
    myBlog.save()  //um die Daten zu speichern in DataBase
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});
//Methode um alle blogs(Daten) in dATABASE zurückzugeben
app.get('/all-blogs', (req, res) => {
    Blog.find() //Find um alle daten zurückzugeben, Blog ist die Klasse also da brauchen wir nicht ein Onjekt zu erzeugen wie erste Methode
        .then((resulta) => { //RESULTA ist halt const
            res.send(resulta);
        })
        .catch((err) => {
            console.log(err);
        });

});
//Methode für Single Blog
app.get('/single.blog', (req, res) => {
    Blog.findById('6355607b8d87f7aefe937c93') //Es wird nur die Daten mit diese ID Nummer angezeigt
        //Vergiis nicht: bevor THEN müssen wir keine nullKomma(;) schreiben
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})
app.get('/', (req, res) => {
    const blogs = [
        { title: 'Joshi finds the Eggs', snippet: 'Lorem ipsum at the End of The programm' },
        { title: 'Brahim finds the Stars', snippet: 'Lorem ipsum Konstruktor at The end...' },
        { title: 'how to defeat the Browser', snippet: 'Lorem ipsum doilor at the End myProgNode' },

    ];
    res.render('index', { title: 'Home', blogs }); //mit res.render wird die Page index aufgerufen, wenn wir die Seit in Browser öffnen
});
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 }) //.sort created -1 wird die Daten in unserer page aufsteigend sortiert also vom BLOG 2 to BLOG 1
        .then((result) => {
            res.render('index', { title: 'ALL Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err);
        })

});
app.post('/blogs', (req, res) => { //'/blogs' weil wir form action blogs in unserer create File geschrieben
    //   console.log(req.body); //Es wird jetzt unsere Eingabe in Webbrowser auf der Console ausgegeben
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs'); //Wichtig: wenn wir die Daten eingeben, wird die Page /blogs angezeigt, also redirect bedeutet nach X Page wechseln
            //Die Eingaben werden auch in My DataBase Mongo gespeichert 
        })
        .catch((err) => {
            console.log(err);
        })

})
app.get('/about', function getPageAbouts(req, res) {

    const blogs = [
        { title: 'Joshi finds the Eggs', snippet: 'Lorem ipsum at the End of The programm' },
        { title: 'Brahim finds the Stars', snippet: 'Lorem ipsum Konstruktor at The end...' },
        { title: 'how to defeat the Browser', snippet: 'Lorem ipsum doilor at the End myProgNode' },

    ];
    res.render('about', { title: 'About', blogs });
});
app.get('/blogs/create', (req, res) => { //Das heisst wenn wir auf das Link blogs/create gehen, wird create.ejs geöffnet
    res.render('create');
})

//Methode dient dazu, dass wenn wir auf die Data anklicken, wird das Link mit id der Data geöffnet
//ZB: klick auf yoshi jogs, wird einen Link mit id der Joshi Jogs geöffnet
//Die id wird auch mit Page details geöffnet>>>weil wir res.render('details') genutzt haben
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    // console.log(id); //Es wird hier die ID auf der console angezeigt und die WebPage wird hängend bleiben
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'Blog Details' });
        })
        .catch(err => {
            console.log(err);

        });
    app.delete('/blogs/:id', (req, res) => {
        const id = req.params.id;
        Blog.findByIdAndDelete(id)
            .then(result => {
                res.json({ redirect: '\blogs' })
            })
            .catch(err => {
                console.log(err);
            })
    })

})
//404 Page
app.use((req, res) => {
    res.status(400).render('404', { title: '404Error' });
});

//app.get('/about-us', (req, res) => { //Diese Methode bedeutet, dass im falle einer Aufruf von dem Link /about-us
//wird das Pagbe /about angezeigt....redirect
//Aber in Ejs brauchen redirect nicht mehr...deshalb Methode>>>auskommentieren
//res.redirect('/about');
//});


