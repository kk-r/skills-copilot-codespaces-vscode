//create web server
const express = require('express');
const app = express();
const comments = require('./comments.js');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//create a route
app.get('/', (req, res) => {
  res.send('Welcome to my comments app');
});

//create a route to get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

//create a route to get a comment by id
app.get('/comments/:id', (req, res) => {
  if (!comments.find(comment => comment.id === parseInt(req.params.id))) {
    res.status(404).send('The comment with the given ID was not found');
  } else {
    res.send(
      comments.find(comment => comment.id === parseInt(req.params.id))
    );
  }
});

//create a route to post a new comment
app.post('/comments', (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send('Name is required and should be minimum 3 characters');
    return;
  }
  const comment = {
    id: comments.length + 1,
    name: req.body.name,
  };
  comments.push(comment);
  res.send(comment);
});

//create a route to update a comment
app.put('/comments/:id', (req, res) => {
  if (!comments.find(comment => comment.id === parseInt(req.params.id))) {
    res.status(404).send('The comment with the given ID was not found');
  } else if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send('Name is required and should be minimum 3 characters');
  } else {
    const comment = comments.find(
      comment => comment.id === parseInt(req.params.id)
    );
    comment.name = req.body.name;
    res.send(comment);
  }
});

//create a route to delete a comment
app.delete('/comments/:id', (req, res) => {
  if (!comments.find(comment => comment.id === parseInt(req.params.id))) {
    res.status(404).send('The comment with the given ID was not found');
  } else {
    const comment = comments.find(
      comment => comment.id === parseInt(req.params.id)
    );
    const index = comments.indexOf(comment