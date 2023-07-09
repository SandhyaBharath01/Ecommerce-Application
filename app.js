const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('64aa887b77abcf59c7802303')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://sandhyapujari26:nYcTZoks4pkupx2t@cluster0.k0yx23e.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(result => {
    User.findOne().then(user =>{ 
      if(!user){
        const user = new User({
          name: "Sandhya",
          email: "sandhya@gmail.com",
          cart:{
            items:[]
          }
        });
        user.save();
      }
    });
    
    app.listen(3000);
    console.log("mongoose connected");
  })
  .catch(err => {
    console.log(err);
  });
