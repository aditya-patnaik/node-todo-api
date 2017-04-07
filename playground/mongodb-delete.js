//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', ( err, db ) => {
	if(err){
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	//Delete Many
	/*db.collection('Todos').deleteMany({ text: 'finish section' }).then((result) => {
		console.log(result);
	});*/

	//Delete One
	/*db.collection('Todos').deleteOne({ text: 'Finish section' }).then((result) => {
		console.log(result);
	});*/

	//findOneAndDelete
	/*db.collection('Todos').findOneAndDelete({ completed: false }).then((result) => {
		console.log(result);
	});*/

	/*db.collection('Users').deleteMany({ name: 'Aditya Narayan Patnaik' }).then((result) => {
		console.log(result);
	});*/

	db.collection('Users').findOneAndDelete({ _id: new ObjectID('58e7300b903997063813569e') }).then((result) => {
		console.log(result);
	});

	//db.close();
});