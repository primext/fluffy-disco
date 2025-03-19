// This file contains utility functions for image processing, including resizing and sharpness estimation.

/**
 * Resizes an image to meet the target file size while maintaining aspect ratio.
 * Reduces quality first, and if the target size is not met, reduces dimensions up to a defined low limit.
 * @param {File} file - The image file to resize.
 * @param {number} targetSize - The target file size in bytes.
 * @returns {Promise<{blob: Blob, aspectRatioReduced: boolean, sharpnessScore: number}>} - A resized image Blob, a flag indicating if the aspect ratio was reduced, and the sharpness score.
 */
async function resizeImage(file, targetSize) {
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    return new Promise((resolve, reject) => {
        img.onload = async () => {
            let width = img.width;
            let height = img.height;
            let quality = 0.9; // Start with high quality
            let scaleFactor = 1.0; // Start with no dimension reduction
            const minScaleFactor = 0.5; // Define the low limit for aspect ratio reduction
            let blob;
            let aspectRatioReduced = false; // Flag to track if aspect ratio was reduced
            let sharpnessScore = 0;

            do {
                // Set canvas dimensions
                canvas.width = width;
                canvas.height = height;

                // Draw the image on the canvas
                ctx.drawImage(img, 0, 0, width, height);

                // Convert the canvas to a Blob
                blob = await new Promise((resolve) => canvas.toBlob(resolve, file.type, quality));

                if (!blob) {
                    reject(new Error('Failed to create Blob from canvas.'));
                    return;
                }

                // Calculate sharpness score
                sharpnessScore = await estimateSharpness(blob);

                // Reduce quality or dimensions if needed
                if (blob.size > targetSize && quality > 0.1) {
                    quality -= 0.1; // Reduce quality
                } else if (blob.size > targetSize && scaleFactor > minScaleFactor) {
                    scaleFactor -= 0.1; // Reduce dimensions
                    width = Math.floor(img.width * scaleFactor);
                    height = Math.floor(img.height * scaleFactor);
                    aspectRatioReduced = true; // Mark that aspect ratio was reduced
                } else {
                    break; // Stop if the file size is within the target or limits are reached
                }
            } while (blob && blob.size > targetSize);

            resolve({ blob, aspectRatioReduced, sharpnessScore });
        };

        img.onerror = () => reject(new Error('Failed to load image.'));
        img.src = URL.createObjectURL(file);
    });
}

/**
 * Estimates the sharpness of an image using the variance of the Laplacian.
 * @param {Blob} blob - The image Blob to analyze.
 * @returns {Promise<number>} - A sharpness score.
 */
async function estimateSharpness(blob) {
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    return new Promise((resolve) => {
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Calculate variance of Laplacian (basic sharpness estimation)
            let sum = 0;
            let sumSq = 0;
            for (let i = 0; i < data.length; i += 4) {
                const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
                sum += gray;
                sumSq += gray * gray;
            }
            const mean = sum / (data.length / 4);
            const variance = sumSq / (data.length / 4) - mean * mean;
            resolve(variance);
        };
        img.src = URL.createObjectURL(blob);
    });
}