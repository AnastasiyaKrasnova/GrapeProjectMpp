const User=require('../model/User');
const UserStatus=require('../model/User_Status');
const BlobServiceClient=require('../helpers/blob_storage');
const UserStatusM2M=require('../model/User_Status_M2M');
const bcrypt=require('bcryptjs')


exports.register=async (data)=>{

    const hashedPassword=await hashPassword(data.password_hash);
    const user=new User({
        first_name: data.first_name,
        last_name: data.last_name,
        login: data.login,
        email: data.email,
        password_hash: hashedPassword,
        role: 'user'
    });

    try{
        const isExists=await isUserExists(data.email);
        if (isExists)
            return 1;
        const savedUser=await user.save();

        const statusid=await getStatusId("warning");
        const user_status_m2m=new UserStatusM2M({
            status: statusid,
            user: savedUser._id
        });

        const usm2m=await user_status_m2m.save();

        return savedUser;
    }catch(err){
        return 0;
    }
}

exports.login=async (data)=>{
    try{
        const emailUser=await isUserExists(data.email);
        if (!emailUser)
            return null
        const validPass=await bcrypt.compare(data.password, emailUser.password_hash)
        if (!validPass)
            return null
        return emailUser

    }catch(err){
        return null;
    }
}

exports.getAll=async()=>{
    try{
        const users=await User.find();
        return users;

    }catch(err){
        return null;
    }
}

exports.filterByStatus=async(status)=>{
    try{
        const entitys=await UserStatusM2M.find({deleted:false})
        .populate({ path: 'status', match: {name: status}})
        .populate({path: 'user'})
        .exec();
        const sorted_users=[]
        entitys.forEach(function(entity) {
            if (entity.status!=null){
                sorted_users.push(entity.user)
            }
        });
        return sorted_users;
    }catch(err){
        return null;
    }
}

exports.filterByRole=async(role)=>{
    try{
        const users=await User.find({role:role})
        return users;

    }catch(err){
        return null;
    }
}

exports.filterById=async(id)=>{
    const user=User.findOne({_id:id});
    return user;
}

exports.update=async(data)=>{
    try{
        const user=await User.findByIdAndUpdate({_id : data.id}, data, {upsert: false})
        return user;
    }
    catch(err) {
        console.log(err);
        return null;
    }
}

exports.update_status=async(user_id,name)=>{
    try{
        const prev=await UserStatusM2M.findByIdAndUpdate({user:user_id, deleted:false},{deleted: true}, {upsert: false})
        const statusid=await getStatusId(name);
        const user_status_m2m=new UserStatusM2M({
            status: statusid,
            user: user_id
        });
        const usm2m=await user_status_m2m.save();
        return usm2m;
    }
    catch(err) {
        console.log(err);
        return null;
    }
}

exports.update_role=async(id,name)=>{
    try{
        const user=await User.findByIdAndUpdate({_id : id}, {role: name}, {upsert: false})
        return user;
    }
    catch(err) {
        console.log(err);
        return null;
    }
}

async function isUserExists(email){
    const user=User.findOne({email:email});
    return user;
}

async function hashPassword(pass){
    const salt=await bcrypt.genSalt(10);
    const hashedPass=await bcrypt.hash(pass,salt);
    return hashedPass;
}

async function getStatusId(name){
    const status=await UserStatus.findOne({name:name});
    return status._id;
}