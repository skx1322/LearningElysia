import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_API_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const imageUploadCall = async (image: File) => {
  try {
    const buffer = await image.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "typescript-project" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(fileBuffer);
    });

    return uploadResult;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
  }
};

export default imageUploadCall;