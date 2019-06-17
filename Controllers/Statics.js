var contactModel=require("../model/modelProducts")

class Statics{
    Top10Product(req,res)
    {
        // kiểm tra phiên làm việc
        var sess = req.session;
       if (typeof sess.email === 'undefined') {
           return res.redirect('/login');
       }

        var limit = 10
    

    contactModel
        .find({})
        .sort({quantitySold:-1})
        .limit(limit)
        .exec(function(err, order) {
           console.log(order)
           return res.render('Statics/Top10Product', { isLogin: true,title: 'Express',data:order });
        })
    }
    
    salesStatics(req,res){
        // kiểm tra phiên làm việc
        var sess = req.session;
       if (typeof sess.email === 'undefined') {
           return res.redirect('/login');
       }

        return res.render('Statics/SalesStatistics', {isLogin: true,title: 'Express' });
    }
}

module.exports = Statics;
