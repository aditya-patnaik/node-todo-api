const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', ( err, db ) => {
	if(err){
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	//http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate
	/*db.collection('Todos').findOneAndUpdate({ 
		_id: new ObjectID('58e7995ac59c798ffee999d8') 
	}, {
		$set: {	completed: true	} //$set is an update operator, refer https://docs.mongodb.com/manual/reference/operator/update/
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});*/

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('58e71f27955aaa2a28f82203')
	}, {
		$set: { name: 'Aditya' },
		$inc: { age: 1 }
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});
});