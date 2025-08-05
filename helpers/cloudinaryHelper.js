const cloudinary = require('../config/cloudinary');

// Why base64?
// You convert the buffer to a base64 data URI, because:
// It’s a string Cloudinary can understand.
// It includes the MIME type (image/jpeg, etc.) along with the data.
// It avoids saving the file to disk, keeping everything in memory.

// Converts your raw buffer into a base64-encoded string:
// fileBuffer.toString('base64')

// data:image/jpeg;base64,
// This tells Cloudinary:
// ➡️ “The content you’re getting is a JPEG image encoded in base64.”
const uploadToCloudinary = async (fileBuffer,mimetype)=>{
    try{
        const base64 = `data:${mimetype};base64,${fileBuffer.toString('base64')}`;
        const result = await cloudinary.uploader.upload(base64);
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