var mongoose=require('mongoose');

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
    quantitySold: 'number'
},{collection:'product'});
module.exports=mongoose.model('Tank', contact);
