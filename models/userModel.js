
// Schema is a skeleton of what our document will 
// look like in a table

const {Schema, model} = require('mongoose');

const user = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    age: {type: Number, required: true},
    phoneNumber: {type: String, required: false, unique: true}
});

module.exports = model('users', user);



