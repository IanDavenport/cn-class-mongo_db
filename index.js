
const mongoose = require('mongoose');
const userModel = require('./models/userModel');

const UserModel = require('./models/userModel');

mongoose.connect('mongodb+srv://Ian:password123abc@cluster0.rsd7t.mongodb.net/fred?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let user = new UserModel({
    name: 'Hannah',
    email: "hanna11@gmail.com",
    age: 39,
    phoneNumber: "07723567474"
});


user.save();  //  adds users to the database when a new data is added into the above.
                 //  but can comment out when NOT adding a new user.   


////////////////////////////////////////////////////
const getUsers = async() => {
    let allUsers = await userModel.find({});
    console.log(allUsers);
}
getUsers();
////////////////////////////////////////////////////











