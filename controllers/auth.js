const SessionModel = require('../models/sessionModel');

exports.checkSignedIn = (async(req, res, next) => {
        if(await SessionModel.checkSession(req.session.userID)) {
            next();
        } else {
            res.send('You must log-in to access this page');
        }
});
