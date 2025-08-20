const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    try {
        // Check if file exists
        if (!file || !file.tempFilePath) {
            throw new Error('No file provided');
        }

        // Configure options
        const options = { 
            folder,
            resource_type: "auto",
            chunk_size: 6000000, // 6MB chunks for better upload handling
            // For video specific options
            eager: {
                width: 720,
                height: 480,
                crop: "pad",
                audio_codec: "none"
            },
            eager_async: true
        };

        // Add optional parameters if provided
        if (height) {
            options.height = height;
        }
        if (quality) {
            options.quality = quality;
        }

        console.log('Uploading file to Cloudinary:', {
            fileName: file.name,
            fileSize: file.size,
            filePath: file.tempFilePath,
            mimeType: file.mimetype
        });

        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        
        console.log('Cloudinary upload successful:', {
            url: result.secure_url,
            duration: result.duration,
            format: result.format
        });

        return result;
    } catch (error) {
        console.error('Cloudinary upload error details:', {
            errorName: error.name,
            errorMessage: error.message,
            errorStack: error.stack,
            file: file ? {
                name: file.name,
                size: file.size,
                type: file.mimetype
            } : 'No file info available'
        });
        throw new Error(`Failed to upload file: ${error.message}`);
    }
};
