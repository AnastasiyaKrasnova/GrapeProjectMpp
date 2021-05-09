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

exports.download_file=async(user_id,file_name,file_ext,container_name,path)=>{
    try{
        const filename=user_id+file_name+"."+file_ext
        const containerClient = blobServiceClient.getContainerClient(container_name);
        const blockBlobClient = containerClient.getBlockBlobClient(filename);
        const uploadBlobResponse = await blockBlobClient.downloadToFile(path)
        return true;
    }
    catch{
        return null
    }
    
}

const downloadBlob = async (blobName, downloadFilePath) => {
    return new Promise((resolve, reject) => {
        const name = path.basename(blobName);
        const blobService = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey); 
        blobService.getBlobToLocalFile(azureStorageConfig.containerName, blobName, `${downloadFilePath}${name}`, function(error, serverBlob) {
            if (error) {
                reject(error);
            } else {
                resolve(downloadFilePath);
            }
        });
    });
};

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
 