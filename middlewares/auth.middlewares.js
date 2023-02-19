
const isLogged = (req, res, next) => {

    if (req.session.User === undefined) {
        res.redirect('/')
    } else {
        next()
    }
};

const isDev = (req, res, next) => {
    if ( req.session.User.role === 'dev'){
        next()
    } else {
        res.redirect('/company')
    }
};

const isCompany = (req, res, next) => {
    if ( req.session.User.role === 'company'){
        next()
    } else {
        res.redirect('/dev')
    }
};

const updateLocals = (req, res, next) => {

    if ( req.session.User === undefined ) {
        res.locals.isUserActive = false
    } else {
        res.locals.isUserActive = true;

        if(req.session.User.role === 'dev') {
            res.locals.isUserDev = true
        } else {
            res.locals.isUserDev = false
        };

        if(req.session.User.role === 'company') {
            res.locals.isUserCompany = true
        } else {
            res.locals.isUserCompany = false
        }
    };
    next()
};

module.exports = {
    isLogged,
    isDev,
    isCompany,
    updateLocals,
};