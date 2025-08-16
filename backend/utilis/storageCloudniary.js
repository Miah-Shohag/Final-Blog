import cloudinary from "cloudinary"
import {CloudinaryStorage} from "multer-storage-cloudinary"
import multer from "multer"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads",
        allowed_formats: ['jpg', 'png', 'jpeg', 'webo']
    },
    public_id: (req, file) => file.fieldname + "-" + Date.now()
})

const filterImage = (req, res, file) => {
    const maxFileSize = process.env.MAX_FILE_SIZE;
    if(maxFileSize > filesize ) {
        return res.status().json({message: "File is too large. File size should be maximum 2 MB"})
    }
    next();
}

export const upload = multer({storage: storage}, filterImage);
