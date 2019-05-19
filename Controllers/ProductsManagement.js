var contactModel=require('../model/model.js');

class ProductsManagement{

    showListProducts(req,res){
        contactModel.find({},function(err,dulieu){
            return res.render('Products/ProductManagement', { title: 'Sản phẩm',data:dulieu });
        })
        
    }

    addProduct(req,res){
        return res.render('Products/AddProduct', { title: 'Express' });
    }

    editProduct(req,res){
        return res.render('Products/EditProduct', { title: 'Express' });
    }
}

module.exports = ProductsManagement;