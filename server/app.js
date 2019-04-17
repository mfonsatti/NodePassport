const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();
const passport = require('passport');
const bycript = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

//Passport Strategy config
require('./config/passport/local')(passport);
require('./config/passport/google')(passport, bycript);

//DB Config
const db = require('./config/mongo').mongoURI;

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//BodyParser
app.use(express.urlencoded({extended: false}));

//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash())

//Global vars
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use('/', require('./Routes/index'));
app.use('/users', require('./Routes/user'));
app.use('/auth', require('./Routes/auth'));
// const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, console.log(`Server running on port ${process.env.PORT}`));
