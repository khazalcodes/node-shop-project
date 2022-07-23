const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const shopRouter = require('./routers/shopRouter');
const adminRouter = require('./routers/adminRouter');
const userRouter = require('./routers/userRouter');
const orderRouter = require('./routers/orderRouter');

const {rootDirectory} = require("./utils/root-directory");
const usersService = require('./services/usersService');
const {mongoConnect} = require('./data/mongodb-database');
const productsRepository = require('./data/repositories/productsRepository');
const usersRepository = require('./data/repositories/usersRepository');
const cartRepository = require('./data/repositories/cartRepository');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(rootDirectory, 'public')));

app.get('/', (req: any, res: any) => {
	res.redirect('/shop/products')
})

app.use('/shop', shopRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/order', orderRouter);

app.get('/500', (req: any, res: any) => {
	res.status(500).render('500', {docTitle: 'An error has occurred!'})
});

app.use((req: any, res: any) => {
	res.status(404).render('404', {docTitle: "Page not found"})
})

mongoConnect()
	.then((db: any) => {
		productsRepository.setDb(db);
		usersRepository.setDb(db);
		cartRepository.setDb(db);
		return usersService.getRootUserDetails()
	})
	.then((user: any) => {
		app.set('user', user);
		app.listen(3000)
		console.log('App listening on port 3000!');
	})
	.catch((err: any) => console.log(err));