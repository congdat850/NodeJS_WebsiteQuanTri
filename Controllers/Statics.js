var contactModel=require("../model/modelProducts")

class Statics{
    Top10Product(req,res)
    {
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
        return res.render('Statics/SalesStatistics', {isLogin: true,title: 'Express' });
    }
}

module.exports = Statics;
