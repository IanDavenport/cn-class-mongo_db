//  npm i nanoid   TO INSTALL NANOID WHICH GIVES RANDOM STRING FOR USER-ID

const {nanoid} = require('nanoid');
const router = require('express').Router();

const UserModel = require('../models/userModel');
const {checkSignedIn} = require('../controllers/auth');

router.get('/', (req, res) => {
    res.render('index');
});


//     V -- ADDING '/users', checkSignedIN async(req, res)  HERE WILL ONLY GIVE SIGNED IN USERS
router.get('/users', async(req, res)=> {
    const users = await UserModel.find({});
    res.send(users);
});

//  SIGN-UP SECTION  ==========================================
router.post('/users/create', async(req, res) => {
    const {name, email, age, phoneNumber, password} = req.body;

    if (!name || !email || !age || !password) {
        res.send('Missing reuqired information');
        return;
    }

    if (await UserModel.checkExists(email, phoneNumber)) {
        res.send('A user with this email or phone number already exists');
        return;
    }

    let hashedpassword = await UserModel.hashPassword(password);

    const user = new UserModel({
        name,
        age,
        email,
        phoneNumber,
        password: hashedpassword
    });

    user.save();

    req.session.userID = nanoid();
    req.session.save();

    res.send('User was created');
});   //  SIGN-UP SECTION  ============================================


// USER LOG-IN & AUTHENTICATION =============================
router.post('/login', async(req, res) => {
    let {email, password, username} = req.body;

    if (!await UserModel.checkExists(email)) {
        res.send('A user with this email doesn\'t exist');
        return;
    }

    if (await UserModel.comparePassword(email, password)) {

        req.session.userID = nanoid();
        req.session.save();

        res.send('You are now logged in');
        return;
    }

    res.send('You have eneterd the wrong password');
});  // USER LOG-IN & AUTHENTICATION =============================


//  THIS BIT CHECKS THAT USERS ARE SIGNED-IN SO CAN VISIT THE 'AUTH ONLY' SECTIONS
//               V-- user profile page
router.get('/protected-route', checkSignedIn, (req, res) => {
    res.send('profile page');
});  //  THIS BIT CHECKS THAT USERS ARE SIGNED-IN SO CAN VISIT THE 'AUTH ONLY' SECTIONS


/// USER LOG-OUT SECTION  ///////////////////////
router.get('/logout', (req, res) => {
    req.session.destroy();

    res.send('your session has ended');
});  /// USER LOG-OUT SECTION  ///////////////////////

module.exports = router;

