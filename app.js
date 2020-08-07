const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const securityData = require(__dirname + '/mongoDB-security-data.js');
const mongoose = require('mongoose');

const homeStartingContent = 'Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.';
const aboutContent = 'Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.';
const contactContent = 'Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.';

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

//Mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://admin-arseniy:${securityData.password}@cluster0.kwkdp.mongodb.net/blogDB?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

//Schema for posts collection
const postsSchema = new mongoose.Schema({
  postTitle: String,
  postBody: String
});

const Post = mongoose.model('Post', postsSchema);
const post1 = new Post({
  postTitle: 'Day 1',
  postBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque purus semper eget duis at tellus. Duis ut diam quam nulla porttitor massa id. Orci nulla pellentesque dignissim enim sit. Id consectetur purus ut faucibus pulvinar elementum integer enim neque. Amet risus nullam eget felis eget nunc lobortis. Lobortis mattis aliquam faucibus purus in massa tempor nec. Nibh ipsum consequat nisl vel pretium lectus quam id. Augue mauris augue neque gravida in. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper. Sit amet tellus cras adipiscing enim. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper.'
})
const post2 = new Post({
  postTitle: 'Day 2',
  postBody: 'Gravida neque convallis a cras semper auctor neque. Curabitur gravida arcu ac tortor dignissim convallis aenean. Et leo duis ut diam. Dapibus ultrices in iaculis nunc. Cras semper auctor neque vitae tempus. Et tortor consequat id porta. Nulla facilisi etiam dignissim diam quis. Ac turpis egestas sed tempus. Dolor magna eget est lorem ipsum dolor sit. Tempus iaculis urna id volutpat lacus laoreet. Nunc sed id semper risus in hendrerit gravida rutrum quisque. Pellentesque sit amet porttitor eget dolor morbi non. A pellentesque sit amet porttitor eget. Sed augue lacus viverra vitae. Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi. Aliquam etiam erat velit scelerisque.Vulputate mi sit amet mauris commodo quis imperdiet massa. Tempus urna et pharetra pharetra massa massa ultricies. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Eget magna fermentum iaculis eu non diam phasellus. Metus vulputate eu scelerisque felis. Pretium nibh ipsum consequat nisl vel pretium lectus. Eget felis eget nunc lobortis mattis aliquam faucibus. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Cras adipiscing enim eu turpis. Velit ut tortor pretium viverra suspendisse. A cras semper auctor neque vitae tempus quam pellentesque. Nulla pellentesque dignissim enim sit amet venenatis urna cursus eget.'
})

const defaultItems = [post1, post2];


// GET requests

app.get('/', function(req, res) {
  Post.find({}, function(err, foundPosts) {
    if (err) {
      console.log(err);
    } else {
      if (foundPosts.length === 0) {
        Post.insertMany(defaultItems, function(err) {
          if (!err) {
            res.redirect('/');
          }
        })
      } else {
        res.render('home', {
          startingContent: homeStartingContent,
          existingPosts: foundPosts
        })
      }

    }
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

app.get('/write', function(req, res) {
  res.render('write', {})
})


app.get('/posts/:postId', function(req, res) {
  const requestedPostId = req.params.postId;
  Post.findById(requestedPostId, function(err, post) {
    res.render('post', {
      chosenPost: post
    })
  })
})

//POST requests

app.post('/write', function(req, res) {
  const newPost = new Post({
    postTitle: req.body.postTitle,
    postBody: req.body.postBody
  })
  newPost.save(function(err) {
    if (!err) {
      res.redirect('/');
    }
  });
})

app.post('/gohome', function(req, res) {
  res.redirect('/');
})

app.post('/delete', function(req, res) {
  let postToDeleteId = req.body.postId;
  Post.deleteOne({
    _id: postToDeleteId
  }, function(err) {
    if (err) {
      console.log(err);
    }
  })
  res.render('deleted-success', {});
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully");
});
