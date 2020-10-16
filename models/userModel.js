
// Schema is a skeleton of what our document will 
// look like in a table

const {Schema, model} = require('mongoose');

const user = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    age: {type: Number, required: true},
    phoneNumber: {type: String, required: false, unique: true}
});


//  STATIC METHODS FOR SCHEMA
user.statics.checkDupes = async function(email, phoneNumber) {
    let result = await this.findOne({$or: [{email}, {phoneNumber}]});

    if (result) {
        return true;
    } 
    return false;
}


module.exports = model('users', user);
//  MODEL IS A PACKAGED VERSION OF THE SCHEMA
//  



