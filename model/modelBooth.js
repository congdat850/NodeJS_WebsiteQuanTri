var mongoose=require('mongoose');
var url = "mongodb://hoaidien:hoaidien0510@ds155606.mlab.com:55606/nodejs";
mongoose.connect(url, {useNewUrlParser: true});

var booth = new mongoose.Schema({
    name: "string",
    img:"string",
    amount:"number"
},{collection:'Booth'});
module.exports=mongoose.model('Booth', booth);