const express = require('express');
const createMongoConnection = require('./utile/dataBase').createMongoConnection;
const app=express()
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const errorController = require('./controllers/error');
createMongoConnection((client)=>{
    console.log('mongoDb connected successfully')
    app.listen(5000,()=>{
        console.log("Node server running sucessfully in port 5000")
    })
})
app.set('view engine', 'ejs');
 app.set('views', 'views');
 const User = require('./models/user');
 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('65a116d7271ea091196b08f2')
    .then(user => {
        console.log(user,"user")
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);