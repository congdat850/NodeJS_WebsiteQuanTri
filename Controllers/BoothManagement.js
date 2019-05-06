class BoothManagement{
    showListBooth(req,res){
        return res.render('Booth/BoothManagement', { title: 'Express' });
    }

    addBooth(req,res){
        return res.render('Booth/AddBooth', { title: 'Express' });
    }

    editBooth(req,res){
        return res.render('Booth/EditBooth', { title: 'Express' });
    }
}

module.exports = BoothManagement;