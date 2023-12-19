//create web server
const express = require('express');
const app = express();
const port = 3000;

//set up public folder
app.use(express.static('public'));

//set up view engine
app.set('view engine', 'ejs');

//use body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//set up mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comments', { useNewUrlParser: true, useUnifiedTopology: true });

//set up schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

//set up model
const Comment = mongoose.model('Comment', commentSchema);

//set up routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comments', { comments: comments });
        }
    });
});

app.post('/comments', (req, res) => {
    const name = req.body.name;
    const comment = req.body.comment;
    const newComment = { name: name, comment: comment };
    Comment.create(newComment, (err, newComment) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/comments');
        }
    });
});

//set up listener
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});