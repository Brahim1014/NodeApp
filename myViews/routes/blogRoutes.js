const express = require('express');
const router = express.Router();//create instanz von Typ Router

router.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 }) //.sort created -1 wird die Daten in unserer page aufsteigend sortiert also vom BLOG 2 to BLOG 1
        .then((result) => {
            res.render('index', { title: 'ALL Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err);
        })

});
router.post('/blogs', (req, res) => { //'/blogs' weil wir form action blogs in unserer create File geschrieben
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
    router.get('/blogs/:id', (req, res) => {
        const id = req.params.id;
        // console.log(id); //Es wird hier die ID auf der console angezeigt und die WebPage wird hängend bleiben
        Blog.findById(id)
            .then(result => {
                res.render('details', { blog: result, title: 'Blog Details' });
            })
            .catch(err => {
                console.log(err);

            });
        router.delete('/blogs/:id', (req, res) => {
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
    router.get('/blogs/create', (req, res) => { //Das heisst wenn wir auf das Link blogs/create gehen, wird create.ejs geöffnet
        res.render('create');
    })

})
module.exports=router;