//  npm i connect-mongo     <==  NEEDED FOR SESSIONS
//  npm i express-session    <==  NEEDED FOR SESSIONS
//  npm i express-handlebars  <==  NEEDED FOR SESSIONS

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const express = require('express');

const SessionModel = require('./models/sessionModel');
const router = require('./routes/router');

mongoose.connect('mongodb+srv://Ian:password123abc@cluster0.j1kc2.mongodb.net/signup?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});   //  ABOVE AVOIDS GETTING DEPRACATION WARNING

const app = express();

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

////////////  SESSIONS CODE BELOW ////////////  
app.use(session({
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, // 2 hours
        secure: false,
        sameSite: true
    }
}));

app.use(async (req, res, next) => {
    let loggedIn = await SessionModel.checkSession(req.session.userID);

    res.locals.loggedIn = loggedIn;

    return next();
});  ////////////  SESSIONS CODE ABOVE ////////////  

app.use('/', router);

app.listen('3000');


// #### EARLY CODE FOR ADDING A NEW USER ####
// let user = new UserModel({      // user is    
//     name: 'George',             // UserModel is     
//     email: "george@gmail.com",
//     age: 42,
//     phoneNumber: "07744246802"
// });
// user.save();  //  adds users to the database when new data is added into the above.
                 //  but can comment out when NOT adding a new user.   


// const getUsers = async() => {
//     let allUsers = await userModel.find({}); //find= [{}, {}, {}]  findOne= {}
//     console.log(allUsers);
//     // let allUsers = await userModel.find({Dean});  // WOULD FIND ONLY DEANS
// }
// getUsers();

