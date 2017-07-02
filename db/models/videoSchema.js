var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    title: {
        type: String,
        required: true
    },
    viewCount: { // in no. of days
        type: Number,
        required: true
    },
    likeCount: {
        type: Number,
        required: true
    },
    dislikeCount: {
        type: Number,
        required: true
    },
    id:{
        required:true,
        type:String
    }
    

}, {
    collection: 'videoData'
});

module.exports = mongoose.model("VideoData", schema);