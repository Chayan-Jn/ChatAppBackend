const cloudinary = require('../config/cloudinary');


const uploadToCloudinary = async (filePath)=>{
    try{
        const result = await cloudinary.uploader.upload(filePath);
        return {
            url:result.secure_url,
            publicId:result.publicId
        }
    }
    catch(err){
        console.log("Error while uploading to cloudinary ",err);
        throw new Error("Error while uploading to cloudinary ")
    }
}

module.exports = {uploadToCloudinary};

// secure_url - This is the image's actual URL
// public_id - This is Cloudinary’s internal identifier
//     It's a unique string assigned to the image (or one you can specify yourself).
//     Used when:
//         You want to delete the image later
//         Or replace it
//         Or apply transformations (resize, blur, etc.)