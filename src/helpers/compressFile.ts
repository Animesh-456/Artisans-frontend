import imageCompression from 'browser-image-compression';

export const compressImage = async (file) => {
  const options = {
    maxSizeMB: 5, // Set max size to 1 MB
    maxWidthOrHeight: 1920, // Resize images if needed
    useWebWorker: true, // Use web workers for better performance
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Error compressing file:', error);
  }
};