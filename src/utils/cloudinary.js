import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}


export const oldPathAvatarUrl = async(cloudinaryUrl) => {
    try {
        if(!cloudinaryUrl){
         return null;   
        }
        // Extract public ID from Cloudinary URL
        const getPublicId = (url) => {
            const regex = /\/(?:v\d+\/)?([^/]+)\.\w+$/;
            const match = url.match(regex);
            return match ? match[1] : null;
        };
        const publicId = getPublicId(cloudinaryUrl);
        if (!publicId) {
            console.warn("Invalid Cloudinary URL, cannot extract public ID:", cloudinaryUrl);
            return null;
        }



        const response = await cloudinary.uploader.destroy(publicId);
         if (response.result === "ok") {
            return response;
        } else {
            console.warn("Failed to delete image from Cloudinary:", publicId, response);
            return null;
        }
      

    } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        return null;
        
    }
}



export {uploadOnCloudinary}