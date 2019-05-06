class ProductsManagement{

    showListProducts(req,res){
        return res.render('Products/ProductManagement', { title: 'Express' });
    }

    addProduct(req,res){
        return res.render('Products/AddProduct', { title: 'Express' });
    }

    editProduct(req,res){
        return res.render('Products/EditProduct', { title: 'Express' });
    }
}

module.exports = ProductsManagement;