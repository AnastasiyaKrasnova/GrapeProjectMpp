const router=require('express').Router();
const Sound=require('../controllers/sounds');
const fs = require('fs');
const path = require('path');
const BlobServiceClient=require('../helpers/blob_storage');
const https=require('https');
const auth=require('../middleware/verifyToken')


router.post('/create', async (req,res)=>{
    const saved=await Sound.add(req.body);
   if (saved)
        res.status(200).send(saved);
   else
        res.status(400).send('json data is incorrect');
});

router.post('/filter', async (req,res)=>{
     console.log(req.body)
     const saved=await Sound.filter(req.body);
    if (saved)
         res.status(200).send(saved);
    else
         res.status(200).send('Nothing found');
 });

router.post('/upload', async (req,res)=>{
     console.log(req.files)
     if (!req.files) {
          res.status(500).send({ msg: "file is not found" })
      }
      const myFile = req.files.file;
      try{
          let full_file= await BlobServiceClient.upload_file(myFile, req.query.author_id, req.query.name, req.query.extension,req.query.type );
          if (full_file!=null)
               res.status(200).send({name: myFile.name, path: full_file});
          else
               res.status(500).send({ msg: "error while uploading file" })  
      }
      catch{
          res.status(500).send({ msg: "error while uploading file" })
      }
      

});

router.delete('/blob_delete',async (req,res)=>{
     try{
          let result= await BlobServiceClient.delete_file(req.query.author_id, req.query.name, req.query.extension,req.query.type);
          if (result!=null)
               res.status(200).send('deleted');
          else
               res.status(500).send({ msg: "error while deleting file 1" })
      }
      catch{
          res.status(500).send({ msg: "error while deleting file" })
      }
     
});

router.post('/download', async(req, res) => {
     const saved=await Sound.filterById(req.query.id);
     const dir=`${global.appRoot}/public/${saved.name+"."+saved.extention}`
     fs.open(dir, 'w',function (err, file) {
          if (err) throw err;
          console.log('Saved!');
        })
     try{
          let full_file= await BlobServiceClient.download_file(saved.author_id, saved.name,saved.extention,"fullfiles",dir);
          if (full_file!=null){
               res.download(dir, (err) => {
                    if (err){
                         console.log(err);
                         return res.status(404).send({ msg: "file is not found" })
                    }})
          }    
          else
               res.status(404).send({ msg: "error while downloading file" })  
      }
      catch{
          res.status(404).send({ msg: "error while downloading file" })
      }
});

router.get('/catalog',async (req,res)=>{
     const saved=await Sound.listAllForCatalog();
     if (saved)
          res.status(200).send(saved);
     else
          res.status(400).send('DB error while getting list of sounds');
});

router.get('/list',async (req,res)=>{
     const saved=await Sound.listAll();
     if (saved)
          res.status(200).send(saved);
     else
          res.status(400).send('DB error while getting list of sounds');
 });

router.put('/update',async (req,res)=>{
     const saved=await Sound.update(req.body);
    if (saved){
          res.status(200).send(saved);
    }     
    else
         res.status(400).send('DB error while updating sound');
 });

router.delete('/delete',async (req,res)=>{
     const saved=await Sound.delete(req.query.id);
     if (saved)
         res.status(200).send(saved);
     else
         res.status(400).send('DB error while deleting sound');
 });


module.exports=router;