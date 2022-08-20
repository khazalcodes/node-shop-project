module.exports = {
    index
}

function index(req: any, res: any) {


    res.render('login/index', {
        docTitle: 'Shop',
        path: '/shop'
    })
}