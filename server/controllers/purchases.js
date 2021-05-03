const Purchase=require('../model/Purchase');
const PurchaseStatus=require('../model/Purchase_Status');
const PurchaseStatus=require('../model/Purchase_Status_M2M');


exports.add=async (data)=>{

    const purchase=new Purchase({
        user_id: data.user_id,
        sound_id: data.sound_id
    });

    try{
        const savedPurchase=await purchase.save();

        const statusid=await getStatusId("carted");
        const purchase_status_m2m=new PurchaseStatusM2M({
            status: statusid,
            purchase: savedUser._id
        });

        const psm2m=await purchase_status_m2m.save();

        return savedPurchase;
    }catch(err){
        return null;
    }
}

exports.getAll=async()=>{
    try{
        const entitys=await PurchaseStatusM2M.find({deleted:false})
        .populate({ path: 'status'})
        .populate({path: 'purchase'})
        .exec();
        const sorted_sound=[]
        entitys.forEach(function(entity) {
                var sound=entity.purchase.populate({path:'sound_id'}).exec();
                sorted_sound.push(sound)
        });

        return sorted_sound;
    }catch(err){
        return null;
    }
}

exports.filterByUser=async(user_id)=>{
    try{
        const entitys=await PurchaseStatusM2M.find({deleted:false})
        .populate({ path: 'status'})
        .populate({path: 'purchase', match: {user_id: user_id}})
        .exec();
        const sorted_sound=[]
        entitys.forEach(function(entity) {
            if (entity.status.name!='carted' &&  entity.purchase!=null){
                var sound=entity.purchase.populate({path:'sound_id'}).exec();
                sorted_sound.push(sound)
            }
        });

        return sorted_sound;
    }catch(err){
        return null;
    }
}

exports.filterByAuthor=async(author_id)=>{
    try{
        const entitys=await PurchaseStatusM2M.find({deleted:false})
        .populate({ path: 'status'})
        .populate({path: 'purchase'})
        .exec();
        const sorted_sound=[]
        entitys.forEach(function(entity) {
            if (entity.status.name!='carted' &&  entity.purchase!=null){
                var sound=entity.purchase.populate({path:'sound_id', match:{author_id: author_id}}).exec();
                if (sound.sound_id!=null)
                    sorted_sound.push(sound)
            }
        });
        return sorted_sound;
    }catch(err){
        return null;
    }
}

exports.filterById=async(id)=>{
    try{
        const entitys=await PurchaseStatusM2M.find({deleted:false})
        .populate({ path: 'status'})
        .populate({path: 'purchase', match: {_id: _id}})
        .exec();
        const sorted_sound=[]
        entitys.forEach(function(entity) {
                var sound=entity.purchase.populate({path:'sound_id'}).exec();
                sorted_sound.push(sound)
        });

        return sorted_sound;
    }catch(err){
        return null;
    }
}

exports.delete=async(id)=>{
    try{
        const purchase=Purchase.findByIdAndDelete({_id:id});
        const psm2m=await PurchaseStatusM2M.findByIdAndDelete({purchase: id});
        return true;
    }
    catch(err) {
        return null;
    }
}

exports.update_status=async(purchase_id,name)=>{
    try{
        const prev=await PurchaseStatusM2M.findByIdAndUpdate({purchase:purchase_id, deleted:false},{deleted: true}, {upsert: false} )
        const statusid=await getStatusId(name);
        const purchase_status_m2m=new PurchaseStatusM2M({
            status: statusid,
            purchase: purchase_id
        });
        const psm2m=await purchase_status_m2m.save();
        return psm2m;
    }
    catch(err) {
        console.log(err);
        return null;
    }
}

async function getStatusId(name){
    const status=await PurchaseStatus.findOne({name:name});
    return status._id;
}