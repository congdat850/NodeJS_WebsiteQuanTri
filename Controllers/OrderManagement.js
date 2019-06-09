var Order=require('../model/modelOrder.js');


class OrderManagement{
    showListOrder(req,res){

    var perPage = 10
    var page = req.query.page || 1

    Order
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, order) {
            Order.count().exec(function(err, count) {
                if (err) return next(err)
             res.render('Order/OrderManagement', {isLogin: true,order: order,current: page,pages: Math.ceil(count / perPage)});
            })
        })
    }

    addOrder(req,res){
        return res.render('Order/AddOrder', { isLogin: true,title: 'Express' });
    }

    editOrder(req,res){
        return res.render('Order/EditOrder', { isLogin: true,title: 'Express' });
    }
}

module.exports = OrderManagement;