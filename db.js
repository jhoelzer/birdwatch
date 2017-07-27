var Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env.DATABASE_URL || 'mongodb://admin:admin@ds125623.mlab.com:25623/jh-birdwatch', {
	host: 'localhost',
	dialect: 'postgres'
});

sequelize.authenticate().then(
	function() {
		console.log('connected to birdwatch postgres database');
	},
	function(err) {
		console.log(err);
	}
);
var User = sequelize.import('./models/user');

module.exports = sequelize;