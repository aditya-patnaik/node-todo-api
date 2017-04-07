//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', ( err, db ) => {
	if(err){
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	/*db.collection('Todos').insertOne({
		text: 'Something to do',
		completed: false
	}, (err,result) => {
		if(err) return console.log('Unable to insert into Todos');
		
		console.log(JSON.stringify(result.ops, undefined, 2)); //pretty print format
	});*/

	/*db.collection('Users').insertOne({
		name: 'Aditya Narayan Patnaik',
		age: 23,
		location: 'India'
	}, (err, result) => {
		if(err) return console.log('Unable to insert into Users');
		console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
	});*/

	db.close();
});