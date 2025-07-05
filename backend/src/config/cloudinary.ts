import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Helper functions for audio uploads
export const uploadAudio = async (file: string, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: 'video', // Cloudinary treats audio as video
      format: 'mp3',
      folder: 'lifebook/audio',
      ...options,
    });
    return result;
  } catch (error) {
    console.error('Error uploading audio to Cloudinary:', error);
    throw error;
  }
};

export const deleteAudio = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'video',
    });
    return result;
  } catch (error) {
    console.error('Error deleting audio from Cloudinary:', error);
    throw error;
  }
}; 