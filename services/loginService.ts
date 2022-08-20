import {LoginIndexViewModel} from "../viewmodels/LoginIndexViewModel";

module.exports = {
    createLoginIndexViewModel
}

function createLoginIndexViewModel(): LoginIndexViewModel {
    return {
        docTitle: 'Login',
        path: '/authentication/login',
        username: '',
        password: '',
        postPath: '/authentication/login',
        submitButtonText: 'Login'
    }
}