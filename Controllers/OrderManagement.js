class OrderManagement{
    showListOrder(req,res){
        return res.render('Order/OrderManagement', { isLogin: true,title: 'Express' });
    }

    addOrder(req,res){
        return res.render('Order/AddOrder', { isLogin: true,title: 'Express' });
    }

    editOrder(req,res){
        return res.render('Order/EditOrder', { isLogin: true,title: 'Express' });
    }
}

module.exports = OrderManagement;