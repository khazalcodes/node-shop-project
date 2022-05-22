const fs = require('fs');
const path = require('path');
const rootDirectory = require('../../utils/root-directory');

const db = path.join(rootDirectory, 'data', 'products.json');

module.exports = {
	saveProduct,
	fetchAll,	
}

function saveProduct (product) {
	readDb(products => {
		products.push(product);
	
		fs.writeFile(db, JSON.stringify(products), (err) => {
			console.log(err);
		})
	});
}


function fetchAll(callback) {
	readDb(callback);
}


function readDb(callback) {
	fs.readFile(db, (readError, fileContent) => {
		if (readError) {
			console.log(readError);
			return callback([]);
		}
		
		try {				
			return callback(JSON.parse(fileContent));
		} catch(parseError) {
			console.log(parseError);
		}
	});
}