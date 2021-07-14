module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please log in to view this content.');
        res.redirect('/users/login');
    },

    ensureTypeEducator: function (req, res, next) {
        userType = req.user.usertype;
        if (userType === 'educator') {
            return next();
        }
        req.flash(
            'error_msg',
            'You must have an educator account to view this content.'
        );
        res.redirect('/users/login');
    },

    ensureTypeStudent: function (req, res, next) {
        userType = req.user.usertype;
        if (userType === 'student') {
            return next();
        }
        req.flash(
            'error_msg',
            'You must have a student account to view this content.'
        );
        res.redirect('/users/login');
    },
};
