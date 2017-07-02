 var express = require("express");
 var axios = require("axios");
 var Video = require('./db/models/videoSchema');
 var mongoose = require('mongoose');
 mongoose.connect("mongodb://bookadda:ritish12@ds011389.mlab.com:11389/heroku_07nnswqs");
 module.exports = function () {


 	var app = express();

 	app.set('port', process.env.PORT || 8888);

 	app.use(express.static('public'));

 	app.engine('html', require('ejs').renderFile);

	 app.get('/',function(req,res){
		 res.render('./index.html');
	 })

 	app.get('/save', function (req, res) {
		
		var id=req.query.id;
		axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id='+id+'&key=AIzaSyDOg-P-QQTJSEfNwQT_pJc5QYCS4KLgv-c').then(function(response){
			var data=response.data.items[0]
			var video=new Video({
				title:data.snippet.title,
				viewCount:data.statistics.viewCount,
				likeCount:data.statistics.likeCount,
				dislikeCount:data.statistics.dislikeCount,
			id:id})
			video.save(function(err,doc){
				if(err||!doc)
					res.send({message:'Error saving data',status:false});
				else
					res.send({status:true,message:'Saved successfully '+doc._id});
			})
		},function(err){
			res.send({message:'Error saving data',status:false});
		})

 	});
	 app.get('/all',function(req,res){
		 Video.find({},function(err,docs){
			 if(err,!docs)
			 	res.send(err);
			else 
			res.send(docs);
		 })

	 })

 	return app;

 }