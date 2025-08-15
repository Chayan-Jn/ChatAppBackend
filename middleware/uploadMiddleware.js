const multer = require('multer');
const path = require('path')



// set storage
const storage = multer.memoryStorage(); // no file on disk, in memory only


// file filter func
const checkFileFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }
    else{
        cb(new Error("Only Images are allowed"),false)
    }
}

module.exports = multer(
    {
        storage:storage,
        fileFilter:checkFileFilter,
        limits:{
            fileSize:25*1024*1024 // 25mb
        }
    }

)

//  Here's the difference:
// Storage type	Where file is saved	What to upload to Cloudinary
// diskStorage	File is saved to disk (e.g. uploads/image_123.png)	✅ Upload req.file.path
// memoryStorage	File is stored in memory (req.file.buffer)	✅ Upload req.file.buffer