
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const express = require('express');

const router = require('./routes/router');

const app = express();

mongoose.connect('mongodb+srv://Ian:password123abc@cluster0.rsd7t.mongodb.net/fred?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); //  ABOVE AVOIDS GETTING DEPRACATION WARNING


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,              //  process.env.IN_PROD
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 2  // = 2 hours
    }
}));





app.use('/', router);

app.listen(3000, () => {
    console.log('listening on port 3000');
});


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




