import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
    throw new Error("Missing Cloudinary configuration in environment variables");
}
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'portifoli_images',
            allowed_formats: ['jpeg', 'png', 'jpg', 'webp']
        };
    }
});
const upload = multer({ storage: storage });
export { upload, cloudinary };
//# sourceMappingURL=cloudinary.js.map