var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var constants = require('../config/constants');

// build out function:
module.exports = function(req, res, next) {
	var sessionToken = req.headers.authorization;
	// we know the authorization is part of this application because it was in the header.js
	if (!req.body.user && sessionToken) {
		jwt.verify(sessionToken, process.env.JWT_SECRET, function(err, decoded){

			if(decoded) {
				User.findOne({where: {id: decoded.id}}).then(
					function(user) {
						req.user = user
						next()
					},
					function(err) {
						res.status(401).send({error: "not authorized"})
						// 400 errors = user problems
					}
				);
				// findOne looks up the exact user in the database
			} else {
				res.status(401).send({error: "not authorized"})
			}
		})
		//
	} else {
		next();
	}
}