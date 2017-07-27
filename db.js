var Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:Rat_Chimera@localhost:5432/birdwatch'/* 'mongodb://admin:admin@ds125623.mlab.com:25623/jh-birdwatch' */, {
	dialect: 'postgres'
});

sequelize.authenticate().then(
	function() {
		console.log('connected to birdwatch mLab database');
	},
	function(err) {
		console.log(err);
	}
);
var User = sequelize.import('./models/user');

module.exports = sequelize;