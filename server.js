 var express = require("express");
 var CB = require("cloudboost");
 module.exports = function () {

 	CB.CloudApp.init('jwnxvlsujgwa', 'c5e0e436-d585-4b23-a06d-6f079860e362');

 	var app = express();

 	app.set('port', process.env.PORT || 8888);

 	app.use(express.static('public'));

 	app.engine('html', require('ejs').renderFile);

 	app.get('/', function (req, res) {
 		res.render("./index.html");
 	});

 	app.get('/update', function (req, res) {
 		var obj = new CB.CloudObject("test");
 		obj.set('name', req.query.name);
 		obj.save({
 			success: (obj) => {
 				console.log(obj)
 			},error:(err)=>{
				 console.log(err)
			 }
 		})
		 res.send();

 	});

 	return app;

 }