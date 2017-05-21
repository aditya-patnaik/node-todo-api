const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

// Todo.findOneAndRemove({_id: 5920e106aea3552e3319adf2}).then((result) => {
//	console.log(result);
// })

Todo.findByIdAndRemove('5920e106aea3552e3319adf2').then((todo) => {
	console.log(todo);
});