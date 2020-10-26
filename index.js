//  npm i connect-mongo     <==  NEEDED FOR SESSIONS
//  npm i express-session    <==  NEEDED FOR SESSIONS

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const express = require('express');

const router = require('./routes/router');


mongoose.connect('mongodb+srv://Ian:password123abc@cluster0.rsd7t.mongodb.net/fred?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); //  ABOVE AVOIDS GETTING DEPRACATION WARNING


const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


////////////  SESSIONS CODE BELOW ////////////  
app.use(session({
    store: new MongoStore({mongooseConnection: mongoose.connection}),   // RE-USES EXISTING CONNECTION SET-UP ABOVE
    secret: 'keyboard cat',         //  SHOULD BE IN process.env WHEN LIVE
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,              //  process.env.IN_PROD  // ONLY NEEDED AS TYRUE OVER HTTPS
        sameSite: true,             //  SO COOKIE CAN'T BE ACCESSED FROM ANOTHER WEBSITE
        maxAge: 1000 * 60 * 60 * 2  // = 2 hours  LOGS USER OUT AFTER TIME SET
    }
}));
////////////  SESSIONS CODE ABOVE ////////////  


app.use('/', router);

app.listen(3000, () => {
    console.log('listening on port 3000');
});



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




