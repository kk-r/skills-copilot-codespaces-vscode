//create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./models/comment');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/comments');
var db = mongoose.connection;

app.get('/comments', function(req, res) {
    console.log('getting all comments');
    Comment.find({})
        .exec(function(err, comments) {
            if (err) {
                res.send('error occured')
            } else {
                console.log(comments);
                res.json(comments);
            }
        });
});

app.get('/comments/:id', function(req, res) {
    console.log('getting a comment');
    Comment.findOne({
            _id: req.params.id
        })
        .exec(function(err, comment) {
            if (err) {
                res.send('error occured')
            } else {
                console.log(comment);
                res.json(comment);
            }
        });
});

app.post('/comments', function(req, res) {
    var newComment = new Comment();
    newComment.title = req.body.title;
    newComment.url = req.body.url;
    newComment.author = req.body.author;
    newComment.save(function(err, comment) {
        if (err) {
            res.send('error saving comment');
        } else {
            console.log(comment);
            res.send(comment);
        }
    });
});