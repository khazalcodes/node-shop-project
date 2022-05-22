const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const rootDirectory = require('./utils/root-directory');

const shopRouter = require('./routers/shopRouter');
const adminRouter = require('./routers/adminRouter');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');


app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(rootDirectory, 'public')));

app.get('/', (req, res, next) => {
	res.redirect('/shop/products')
})

app.use('/shop', shopRouter);

app.use('/admin', adminRouter);

app.use((req, res, next) => {
	res
		.status(404)
		.render('404', {docTitle: "Page not found"})
})

app.listen(3000);