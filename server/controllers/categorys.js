const Category=require('../model/Category');
const _this=this

exports.add=async (data)=>{
    const cat=new Category({
        name: data.name,
        parent_category_id: data.parent_id,
    });
    try{
        const saved=await cat.save();
        return saved;

    }catch(err){
        console.log(err)
        return null;
    }
}

exports.listAll=async()=>{
    try{
        const cat=await Category.find();
        return cat;

    }catch(err){
        return null;
    }
}

exports.filterById=async(id)=>{
    try{
        const cat=await Category.findOne({_id: id});
        return cat;

    }catch(err){
        return null;
    }
}

exports.filterByParent=async(parent_id)=>{
    try{
        const cat=await Category.find({parent_category_id: parent_id});
        return cat;

    }catch(err){
        return null;
    }
}