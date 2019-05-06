class OrderManagement{
    showListOrder(req,res){
        return res.render('Order/OrderManagement', { title: 'Express' });
    }

    addOrder(req,res){
        return res.render('Order/AddOrder', { title: 'Express' });
    }

    editOrder(req,res){
        return res.render('Order/EditOrder', { title: 'Express' });
    }
}

module.exports = OrderManagement;