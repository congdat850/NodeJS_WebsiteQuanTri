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

    deleteProduct(req,res){
        var id=req.params.idDelete;
        contactModel.findByIdAndRemove(id).exec();
        return res.redirect('/DanhSachSanPham');
    }
}

module.exports = ProductsManagement;