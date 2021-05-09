const router=require('express').Router();
const jwt=require('jsonwebtoken');
const User=require('../controllers/users');


router.post('/register', async (req,res)=>{
     const saved=await User.register(req.body);
     if (saved==0)
          res.status(406).send('User data is not full');
     else if (saved==1){
          res.status(406).send('User already exists');
     }
     else{
          const token=jwt.sign({_id: saved._id, role: saved.role},process.env.TOKEN_SECRET)
          res.cookie("auth-token", token,{maxAge: 11000000}).send(token);
     }        
});


router.post('/login', async (req,res)=>{
     console.log(req.body);
     const valid=await User.login(req.body);
     if (valid){
          console.log("Id",valid.id)
          const token=jwt.sign({_id: valid.id, role: valid.role},process.env.TOKEN_SECRET)
          res.cookie("auth-token", token,{maxAge: 11000000}).send(token);
     }   
     else
          res.status(401).send('Email or password is incorrect');
});

router.get('/list', async (req,res)=>{
     if (req.query.id){
          const saved=await User.filterById(req.query.id);
          if (saved)
               res.status(200).send(saved);
          else
               res.status(400).send('DB error while getting list of users');
     }
     else if (req.query.status){
          const saved=await User.filterByStatus(req.query.status);
          if (saved)
               res.status(200).send(saved);
          else
               res.status(400).send('DB error while getting list of users');
     }
     else if (req.query.role){
          const saved=await User.filterByRole(req.query.role);
          if (saved)
               res.status(200).send(saved);
          else
               res.status(400).send('DB error while getting list of users');
     }
     else{
          const saved=await User.getAll();
          if (saved)
               res.status(200).send(saved);
          else
               res.status(400).send('DB error while getting list of users');
     }
});

router.put('/update_status', async (req,res)=>{

     const saved=await User.update_status(req.query.user_id,req.query.name)
     if (saved){
          res.status(200).send(saved);
     }     
     else
         res.status(400).send('DB error while updating date');
 });

/*router.put('/users/update', async (req,res)=>{

     console.log(req.body)
     const saved=await Task.update(req.body);
     if (saved){
          res.status(200).send(saved);
     }     
     else
         res.status(400).send('DB error while updating date');
 });*/

router.put('/users/update_role', async (req,res)=>{

     const saved=await User.update_role(req.query.user_id, req.query.name);
     if (saved){
          res.status(200).send(saved);
     }     
     else
         res.status(400).send('DB error while updating users role');
});

router.put('/users/logout', async (req,res)=>{

     /*console.log(req.body)
     const saved=await Task.update(req.body);
     if (saved){
          res.status(200).send(saved);
     }     
     else
         res.status(400).send('DB error while updating date');*/
});




module.exports=router;