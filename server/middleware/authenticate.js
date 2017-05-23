var {User} = require('./../models/user');

//MIDDLEWARE
//Always called with three arguments
//Next: The next route won't be called until next() is executed
var authenticate = (req, res, next) => {
	var token = req.header('x-auth');

	User.findByToken(token).then((user) => {
		if(!user){
			new Promise.reject();		//by doing this, the success case of then is never called, and it goes straight to catch
		}
		req.user = user;
		req.token = token;
		next();
	}).catch((e) => {
		res.status(401).send();
	});
}

module.exports = {authenticate};