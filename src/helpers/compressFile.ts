import imageCompression from 'browser-image-compression';

export const compressImage = async (file) => {
  const options = {
    maxSizeMB: 1, // Set max size to 1 MB
    maxWidthOrHeight: 1920, // Resize images if needed
    useWebWorker: true, // Use web workers for better performance
  };

  try {
    // Compress the image
    const compressedBlob = await imageCompression(file, options);

    // Create a new File object to retain the file name and type (extension)
    const compressedFile = new File([compressedBlob], file.name, {
      type: file.type,
      lastModified: Date.now(), // Optional: update last modified timestamp
    });

    return compressedFile;
  } catch (error) {
    console.error('Error compressing file:', error);
    return null;
  }
};
