class Statics{
    topTenProducts(req,res){
        return res.render('Statics/Top10Product', { isLogin: true,title: 'Express' });
    }
    
    salesStatics(req,res){
        return res.render('Statics/SalesStatistics', {isLogin: true,title: 'Express' });
    }
}

module.exports = Statics;
