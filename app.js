const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth');
const treasureRoutes = require('./routes/treasure');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();

const MONGODB_URI = 'mongodb+srv://dindinn:MXbQmHoyB3aPnuni@cluster0-f3qhd.mongodb.net/luckyshine';


app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
  });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(authRoutes);
app.use(treasureRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(process.env.PORT || 5000);
  })
  .catch(err => {
    console.log(err);
  });


//Pwd => MXbQmHoyB3aPnuni