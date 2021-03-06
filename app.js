require('dotenv').config();

var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var sequelize = require('./db.js');
var User = sequelize.import(__dirname + '\\models\\user');
							// './models/user'
User.sync();
/* THIS WILL DROP THE USER TABLE
User.sync({ force: true })
*/

app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));
app.use('/api/user', require('./routes/user'));
app.use('/api/login', require('./routes/session'));
app.use('/api/test', function(req, res) {
	res.send("Hello");
});


http.listen(port, function() {
	console.log("app is listening on 3000");
});