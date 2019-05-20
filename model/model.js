var mongoose=require('mongoose');
var url = "mongodb://hoaidien:hoaidien0510@ds155606.mlab.com:55606/nodejs";
mongoose.connect(url, {useNewUrlParser: true});


var contact = new mongoose.Schema({
    productID: 'string',
    name: 'string',
    oldPrice: 'string',
    newPrice: 'string',
    img: "string",
    description: 'string',
    starEvaluate: 'number',
    producer: 'string',
    categoryID: 'number',
    dateUpdate: 'string',
    country: 'string',
    quantity: 'number',
    quantitySold: 'number'
},{collection:'Products'});
module.exports=mongoose.model('Tank', contact);
