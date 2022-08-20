const loginService = require('../services/loginService')

module.exports = {
    index,
    login
}

function index(req: any, res: any) {
    res.render('authentication/login-form', loginService.createLoginIndexViewModel());
}

function login(req: any, res: any) {
    res.redirect('/');
}