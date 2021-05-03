const router=require('express').Router();
const Purchase=require('../controllers/purchases');


router.post('/add', async (req,res)=>{
     const saved=await Purchase.add(req.body);
     if (saved)
          res.status(200).send(saved);
     else
          res.status(400).send('json data is incorrect');
});

router.get('/list', async (req,res)=>{
     if (req.query.id){
          const saved=await Purchase.filterById(req.query.id);
          if (saved)
               res.status(200).send(saved);
          else
               res.status(400).send('DB error while getting list of purchases');
     }
     else if (req.query.user_id){
          const saved=await Purchase.filterByUser(req.query.user_id);
          if (saved)
               res.status(200).send(saved);
          else
               res.status(400).send('DB error while getting list of purchases');
     }
     else if (req.query.author_id){
        const saved=await Purchase.filterByAuthor(req.query.author_id);
        if (saved)
             res.status(200).send(saved);
        else
             res.status(400).send('DB error while getting list of purchases');
   }
     else{
          const saved=await Purchase.getAll();
          if (saved)
               res.status(200).send(saved);
          else
               res.status(400).send('DB error while getting list of purchases');
     }
});

router.get('/status',async (req,res)=>{

    const saved=await Purchase.get_status(req.query.id)
    if (saved){
         res.status(200).send(saved);
    }     
    else
        res.status(400).send('DB error while getting purchase status');
});

router.put('/update_status', async (req,res)=>{

    const saved=await Purchase.update_status(req.query.user_id,req.query.name)
    if (saved){
         res.status(200).send(saved);
    }     
    else
        res.status(400).send('DB error while updating purchase status');
});


module.exports=router;