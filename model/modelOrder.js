var mongoose=require('mongoose');
var url = "mongodb://hoaidien:hoaidien0510@ds155606.mlab.com:55606/nodejs";
mongoose.connect(url, {useNewUrlParser: true});


var order = new mongoose.Schema({
    name: "string",
    newPrice: "string",
    img: "string",
    userName: "string",
    email: "string",
    phoneNumber: "string",
    address: "string",
    status: "string"
},{collection:'Order'});
module.exports=mongoose.model('Order', order);
