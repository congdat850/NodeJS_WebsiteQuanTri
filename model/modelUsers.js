var mongoose=require('mongoose');
var url = "mongodb://hoaidien:hoaidien0510@ds155606.mlab.com:55606/nodejs";
mongoose.connect(url, {useNewUrlParser: true});


var contact = new mongoose.Schema({
    userID: 'string',
    userName: 'string',
    authority: 'string',
    email: 'string',
    phoneNumber: 'string',
    password: 'string'
},{collection:'Users'});
module.exports=mongoose.model('user', contact);
