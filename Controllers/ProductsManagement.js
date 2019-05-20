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
        // Get Product ID
        var productID = req.query.id;
        var query = {
            "productID" : productID
        };
        contactModel.find(query,function(err,productData){
            if (productData.length !== 1) return res.redirect('/DanhSachSanPham');
            return res.render('Products/EditProduct', { title: 'Chỉnh sửa sản phẩm',data: productData[0] });
        })
    }

    postEditProduct(req,res){
        // Get Product ID
        var productID = req.query.id;
        var query = {
            "productID" : productID
        };
        contactModel.findOneAndUpdate(query,req.body,{upsert:true},function(err,doc){
            if (err) return res.send(500, { error: err });
            return res.redirect('/ChinhSuaSanPham?id='+ productID);
        });
    }

    deleteProduct(req,res){
        var id=req.params.idDelete;
        contactModel.findByIdAndRemove(id).exec();
        return res.redirect('/DanhSachSanPham');
    }
}

module.exports = ProductsManagement;