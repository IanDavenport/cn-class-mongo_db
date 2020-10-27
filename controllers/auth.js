const SessionModel = require('../models/sessionModel');

exports.checkSignedIn = async (req, res, next) => {

    if (await SessionModel.checkSession(req.session.userID)) {
        next();
        return;
    }

    res.send('you must be logged in to access this page');
}