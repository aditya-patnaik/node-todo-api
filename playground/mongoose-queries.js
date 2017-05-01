const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

/*var id = '59074c1aaad6e12f04ea61f91';

if(!ObjectId.isValid(id)){
	console.log('Id not valid');
}

Todo.find({
	_id: id
}).then((todos) => {
	console.log('Todos', todos);
})

Todo.findOne({
	_id: id
}).then((todo) => {
	console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
	if(!todo) {
		return console.log('Id not found');
	}
	console.log('Todo', todo);
}).catch((e) => console.log(e));*/

var id ='58ec3bd3d19fd10790a4141c';

User.findById(id).then((user) => {
	if(!user) {
		return console.log('Id not found');
	}
	console.log('User', user);
}).catch((e) => console.log(e));