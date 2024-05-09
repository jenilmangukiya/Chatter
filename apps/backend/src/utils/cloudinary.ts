import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File uploaded to cloudinary At: ", response.url);
    fs.unlinkSync(localFilePath); // remove unused file
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove unused file
    return null;
  }
};

const removeFromCloudinary = async (url: string, resource_type = "auto") => {
  try {
    const publicId = cloudinary
      .url(url, { secure: true })
      .split("/")
      .pop()
      ?.replace(/\..*/, "");

    if (publicId)
      return await cloudinary.uploader.destroy(publicId, {
        resource_type,
      });
    else return null;
  } catch (error) {
    return null;
  }
};

export { removeFromCloudinary, uploadOnCloudinary };
