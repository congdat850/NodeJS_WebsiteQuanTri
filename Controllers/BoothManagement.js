class BoothManagement{
    showListBooth(req,res){
        return res.render('Booth/BoothManagement', { isLogin: true,title: 'Express' });
    }

    addBooth(req,res){
        return res.render('Booth/AddBooth', { isLogin: true,title: 'Express' });
    }

    editBooth(req,res){
        return res.render('Booth/EditBooth', { isLogin: true,title: 'Express' });
    }
}

module.exports = BoothManagement;