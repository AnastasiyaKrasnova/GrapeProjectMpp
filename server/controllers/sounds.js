const Sound=require('../model/Sound');

const _this=this

exports.add=async (data)=>{
    const sound=new Sound({
        catalog_num: data.catalog_num,
        name: data.name,
        extention: data.extention,
        full_url: data.full_url,
        demo_url: data.demo_url,
        image_url: data.image_url,
        currency_code: data.currency_code,
        duration: data.duration,
        price: data.price,
        author_id: data.author_id,
    });
    try{
        const saved=await sound.save();
        return saved;

    }catch(err){
        console.log(err)
        return null;
    }
}

exports.listAll=async()=>{
    try{
        const sound=await Sound.find();
        return sound;

    }catch(err){
        return null;
    }
}

exports.listAllForCatalog=async()=>{
    try{
        const sound=await Sound.find({deleted:false});
        return sound;

    }catch(err){
        return null;
    }
}

exports.filter=async(data)=>{
    try{
        const sounds=await setFilters(data.catalog_num,data.name,data.extension,data.duration_to,data.duration_from,data.price_to,data.price_from,data.author_id,data.category_id);
        return sounds;

    }catch(err){
        console.log(err)
        return null;
    }
}

exports.filterById=async(id)=>{
    try{
        const sounds=await Sound.findOne({_id: id});
        return sounds;

    }catch(err){
        return null;
    }
}

exports.filterByCatalogNum=async(catalog_num)=>{
    try{
        const sounds=await Sound.findOne({catalog_num: catalog_num});
        return sounds;

    }catch(err){
        return null;
    }
}

exports.filterByAuthor=async(author_id)=>{
    try{
        const entitys=await Sound.find({author_id: author_id})
        return entitys;

    }catch(err){
        return null;
    }
}

exports.filterByCategory=async(category_id)=>{
    try{
        const entitys=await Sound.find({category_id: category_id})
        return entitys;

    }catch(err){
        return null;
    }
}

exports.filterByName=async(name)=>{
    try{
        const entitys=await Sound.find({ "name": { "$regex": name, "$options": "i" }})
        return entitys;

    }catch(err){
        return null;
    }
}

exports.update=async(data)=>{
    try{
        const sound=await Sound.findByIdAndUpdate({_id : data.id}, data, {upsert: false})
        return sound;
    }
    catch(err) {
        console.log(err);
        return null;
    }
}
exports.delete=async(id)=>{
    try{
        const sound=await Sound.findByIdAndUpdate({_id : id}, {deleted:true}, {upsert: false})
        return true;
    }
    catch(err) {
        return null;
    }
}

async function filterByDuration(from,to){
    try{
        const entitys=await Sound.find({ "duration": { "$gte": from, "$lte": to}})
        return entitys;

    }catch(err){
        return null;
    }
}

async function filterByPrice(from,to){
    try{
        const entitys=await Sound.find({ "price": { "$gte": from, "$lte": to}})
        return entitys;

    }catch(err){
        return null;
    }
}

async function filterByExtension(ext){
    try{
        const entitys=await Sound.find({extention: ext})
        return entitys;

    }catch(err){
        return null;
    }
}

async function setFilters(catalog_num,name,extension,duration_to,duration_from,price_to,price_from,author_id,category_id){
    let filter_count=0
    let filter1=[]
    if (catalog_num){
        filter1=await _this.filterByCatalogNum(catalog_num)
        filter_count+=1
    }
    let filter2=[]
    if (name){
        filter2=await _this.filterByName(name)
        filter_count+=1
    }
    let filter3=[]
    if (duration_to || duration_from){
        filter3=await filterByDuration(duration_from,duration_to)
        filter_count+=1
    }
    let filter4=[]
    if (price_to || price_from){
        filter4=await filterByPrice(price_from,price_to)
        filter_count+=1
    }
    let filter5=[]
    if (author_id){
        filter5=await _this.filterByAuthor(author_id)
        filter_count+=1
    }
    let filter6=[]
    if (category_id){
        filter6=await _this.filterByCategory(category_id)
        filter_count+=1
    }
    let filter7=[]
    if (extension){
        filter7=await filterByExtension(extension)
        filter_count+=1
    }
    const full_res=filter1.concat(filter2,filter3,filter4,filter5,filter6,filter7)
    let result = [];
    full_res.forEach(function(elem) {
        if(Repeats(full_res,result,elem,filter_count)) {
            result.push(elem);
        }
    });
    return result
}

function Repeats(full_list,result_list,item, count){
    let repeat=full_list.filter((v) => (v.catalog_num === item.catalog_num)).length;
    let uniq=result_list.filter((v) => (v.catalog_num === item.catalog_num)).length;
    if (repeat==count && uniq==0)
        return true
    else
        return false
}
