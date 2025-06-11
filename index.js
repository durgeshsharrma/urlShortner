const express = require('express');
const app = express();
const urlRoute = require('./routes/url');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const path = require('path');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const session = require('express-session');
const userRoute  = require('./routes/user');
const user = require('./models/user')
const dotenv = require('dotenv')
dotenv.config()



app.use(express.static(path.join(__dirname , '/public')));
app.set('view engine' , "ejs");
app.set('views' , path.join(__dirname , '/views'));

app.engine("ejs" , ejsMate)

app.use(express.urlencoded({extended : false}));


const sessionOptions = {
    secret : "mysupersecretcode",
    resave  :  false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly  : true,
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());




passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());



app.use((req ,  res , next) => {
    res.locals.succMsg = req.flash('success');
    res.locals.errMsg = req.flash('error');
    res.locals.currUser = req.user;
    next();
})





connection().then(() => {
    console.log('connection successful')
})
async function connection(){
   await mongoose.connect(process.env.MONGO_URI);
}






app.use(urlRoute);
// app.use(userRoute);


app.listen(3000, (err) => {
    if (err) {
        console.log(err)
        
    } else {
         console.log('server has started on port 3000');
    }

})