var booth=require('../model/modelBooth')
var product=require('../model/modelProducts')

class BoothManagement{
    showListBooth(req,res){
        booth.find({}).exec(function(err,data){
        
        for(var i=0;i<data.length;i++)
        {
            var hayqua=new Array();
            hayqua.push(data[i].name)
            // var ten ={
            //     "name":data[i].name
            // }
            console.log(hayqua)
            
            product.find({"producer":data[i].name}).exec(function(err,sanpham){

                var them={
                    "amount":sanpham.length
                }
                
                
                if(sanpham.length!=0)
                var qua={
                    'name':sanpham[0].producer
                }
                console.log(hayqua)
               
               
                if(qua)
                booth.findOneAndUpdate(qua,them,{upsert:true},function(err,doc){
                    if (err) return res.send(500, { error: err });
                })
                
                
            })
        }
        })

        booth.find({}).exec(function(err,datahihi){
            return res.render('Booth/BoothManagement', { isLogin: true,title: 'Danh sách gian hàng',booth:datahihi });
        })
        
    }
 // cái ni chút coi lại
    showBoothDetails(req,res)
    {
        var name =req.query.name
        var ten ={
            "name":name
        }
        product.find({"producer":name}).exec(function(err,sanpham){
            var them={
                "amount":sanpham.length
            }
            booth.findOneAndUpdate(ten,them,{upsert:true},function(err,doc){
                if (err) return res.send(500, { error: err });
            })
           
            return res.render('Products/ProductManagement', { isLogin: true,title: 'Express',data:sanpham });
        })
    }

    addBooth(req,res){
        return res.render('Booth/AddBooth', { isLogin: true,title: 'Express' });
    }
    postAddBooth(req,res)
    {
        var dulieu={
            'name': req.body.name.toUpperCase(),
            'amount':'0'
        }

        var data =new booth(dulieu)
        data.save()
        return res.redirect('/DanhSachGianHang');
    }

    editBooth(req,res){
        
        var _id=req.query.id
     
        booth.findById({_id}).exec(function(err,gianHang){
            return res.render('Booth/EditBooth', { isLogin: true,title: 'Chỉnh sửa gian hàng',data:gianHang});
        })

        
        
    }
    postEditBooth(req,res)
    {
        var tenGianHangBiThayDoi =""
        var _id=req.query.id
        booth.findById(_id).exec(function(err,ten){
            tenGianHangBiThayDoi=ten.name
        })

        var name=req.body.name.toUpperCase()
        var thaydoi={
            "name":name
        }
        booth.findByIdAndUpdate(_id,thaydoi,{upsert:true},function(err,doc){
            if (err) return res.send(500, { error: err });
            return res.redirect('/DanhSachGianHang');
        })
    }

    deleteBooth(req,res)
    {
        var id=req.query.id
        booth.findOneAndRemove({"name":id}).exec();
        product.deleteMany({"producer":id}).exec()
        return res.redirect('/DanhSachGianHang');
    }
}

module.exports = BoothManagement;