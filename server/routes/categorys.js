const router=require('express').Router();
const Category=require('../controllers/categorys');



router.post('/add', async (req,res)=>{
     const saved=await Category.add(req.body);
     if (saved)
          res.status(200).send(saved);
     else
          res.status(400).send('json data is incorrect');
});

router.get('/list', async (req,res)=>{
     if (req.query.id){
          const saved=await Category.filterById(req.query.id);
          if (saved)
               res.status(200).send(saved);
          else
               res.status(400).send('DB error while getting list of categorys');
     }
     else if (req.query.parent_id){
          if (req.query.parent_id=="all") req.query.parent_id=null
          if (req.query.type=="back"){
               const saved=await Category.filterByParent(req.query.parent_id);
               req.query.parent_id=saved.parent_id;
          }
          const saved=await Category.filterByParent(req.query.parent_id);
          if (saved)
               res.status(200).send(saved);
          else
               res.status(400).send('DB error while getting list of categorys');
     }
     else{
          const saved=await Category.listAll();
          if (saved)
               res.status(200).send(saved);
          else
               res.status(400).send('DB error while getting list of categorys');
     }
});

module.exports=router;