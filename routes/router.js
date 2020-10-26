//  npm i nanoid   TO INSTALL NANOID WHICH GIVES RANDOM STRING FOR USER-ID

const {Router} = require('express');
const UserModel = require('../models/userModel');
const {checkSignedIn} = require('../controllers/auth');

const {nanoid} = require('nanoid');
const router = Router();


//                  V -- ADDING '/users', checkSignedIN async(req, res)  HERE WILL ONLY GIVE SIGNED IN USERS
router.get('/users', async(req, res) => {
    let allUsers = await UserModel.find({});
    res.send(allUsers);
});
 

//  SIGN-UP SECTION  ==========================================
router.post('/users/create', async(req, res) => {
    let {name, email, age, phoneNumber, password} = req.body;

    if (!name || !email || !age || !password) {
        res.send('Missing required info');
        return;
    }

    if (await UserModel.checkExists(email, phoneNumber)) {
        res.send('A user with this email or phone number already exists');
        return;
    }

    let hashedPassword = await UserModel.hashPassword(password);

    let user = new UserModel({
        name,
        email,
        age,
        phoneNumber,
        password: hashedPassword
    });

    user.save();
    req.session.userID = nanoid();
    res.send('user created');
});
//  SIGN-UP SECTION  ============================================



// USER LOG-IN & AUTHENTICATION =============================
router.post('/login', async (req, res) => {
    let {email, password} = req.body;

    if (!await UserModel.checkExists(email)) {
        res.send('A user with this email doesn\'t exist');
        //  Incorrect user details submitted
        return
    }

    if (await UserModel.comparePassword(email, password)) {
        req.session.userID = nanoid();
        req.session.save();
        res.send('You are now signed in')
        //  User authenticated and signed in
        return
    }
        res.send('You have entered an incorrect password')
        // User entered an incorredct password message
});
// USER LOG-IN & AUTHENTICATION =============================



//  THIS BIT CHECKS THAT USERS ARE SIGNED-IN SO CAN VISIT THE 'AUTH ONLY' SECTIONS
//               V-- user profile page
router.get('/protected-route', checkSignedIn, (req,res) => {
    res.send('Welcome to the Protected Page');
});
//  THIS BIT CHECKS THAT USERS ARE SIGNED-IN SO CAN VISIT THE 'AUTH ONLY' SECTIONS



module.exports = router;
