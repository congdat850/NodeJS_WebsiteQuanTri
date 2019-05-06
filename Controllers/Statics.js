class Statics{
    topTenProducts(req,res){
        return res.render('Statics/Top10Product', { title: 'Express' });
    }
    
    salesStatics(req,res){
        return res.render('Statics/SalesStatistics', { title: 'Express' });
    }
}

module.exports = Statics;
