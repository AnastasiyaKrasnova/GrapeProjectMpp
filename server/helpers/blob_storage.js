const { BlobServiceClient } = require('@azure/storage-blob');
const dotenv=require('dotenv');


dotenv.config();
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);


exports.upload_file=async(file,user_id,file_name,file_ext,container_name)=>{
    try{
        const filename=user_id+file_name+"."+file_ext
        const containerClient = blobServiceClient.getContainerClient(container_name);
        const blockBlobClient = containerClient.getBlockBlobClient(filename);
        const uploadBlobResponse = await blockBlobClient.upload(file.data, file.data.length);
        return `${process.env.AZURE_STORAGE_DOWNLOAD_URL}${container_name}/${filename}`
    }
    catch{
        return null
    }
    
}

exports.delete_file=async(user_id,file_name,file_ext,container_name)=>{
    try{
        const filename=user_id+file_name+"."+file_ext
        const containerClient = blobServiceClient.getContainerClient(container_name);
        const blockBlobClient = containerClient.getBlockBlobClient(filename);
        const deleteBlobResponse = await blockBlobClient.delete(); 
        return true;
    }
    catch{
        return null
    }
    
}
 