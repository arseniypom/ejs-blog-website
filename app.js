//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const homeStartingContent = 'Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.';
const aboutContent = 'Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.';
const contactContent = 'Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.';

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//Global variable, array of posts
let posts = [
  {
    title: 'Day 1',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque purus semper eget duis at tellus. Duis ut diam quam nulla porttitor massa id. Orci nulla pellentesque dignissim enim sit. Id consectetur purus ut faucibus pulvinar elementum integer enim neque. Amet risus nullam eget felis eget nunc lobortis. Lobortis mattis aliquam faucibus purus in massa tempor nec. Nibh ipsum consequat nisl vel pretium lectus quam id. Augue mauris augue neque gravida in. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper. Sit amet tellus cras adipiscing enim. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper.'
  },
  {
    title: 'Day 1',
    body: 'Ultrices sagittis orci a scelerisque purus. A arcu cursus vitae congue mauris. Vitae congue eu consequat ac felis donec et. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Eget duis at tellus at urna condimentum mattis. Et ligula ullamcorper malesuada proin libero nunc consequat.'
  },
  {
    title: 'Day 1',
    body: 'Orci nulla pellentesque dignissim enim sit. Id consectetur purus ut faucibus pulvinar elementum integer enim neque. Amet risus nullam eget felis eget nunc lobortis. Lobortis mattis aliquam faucibus purus in massa tempor nec. Nibh ipsum consequat nisl vel pretium lectus quam id. Augue mauris augue neque gravida in. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper. Sit amet tellus cras adipiscing enim. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Ultrices sagittis orci a scelerisque purus. A arcu cursus vitae congue mauris. '
  }
];

app.get('/', function(req, res) {
  res.render('home', {
    startingContent: homeStartingContent,
    existingPosts: posts
  })
})

app.get('/about', function(req, res) {
  res.render('about', {
    aboutContent: aboutContent
  })
})

app.get('/contact', function(req, res) {
  res.render('contact', {
    contactContent: contactContent
  })
})

app.get('/compose', function(req, res) {
  res.render('compose', {
  })
})


app.get('/posts/:postName', function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(post => {
    const storedPost = _.lowerCase(post.title);
    if (storedPost === requestedTitle) {
      res.render('post', {
        title: post.title,
        content: post.body
      })
    }
  })
})


app.post('/compose', function(req, res) {
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody
  }
  console.log(post.link);
  posts.push(post);
  res.redirect('/');
})









app.listen(3000, function() {
  console.log('Server started on port 3000');
});
