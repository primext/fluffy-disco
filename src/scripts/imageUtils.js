// This file contains utility functions for image processing.

/**
 * Resizes an image to meet the target file size.
 * @param {File} file - The image file to resize.
 * @param {number} targetSizeInBytes - The target file size in bytes.
 * @returns {Promise<{blob: Blob, aspectRatioReduced: boolean}>}
 */
export async function resizeImage(file, targetSizeInBytes) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.onload = async () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Start with the original dimensions
            let width = img.width;
            let height = img.height;

            // Set initial quality
            let quality = 0.9;
            let blob;

            do {
                // Resize the canvas dimensions if necessary
                if (blob && blob.size > targetSizeInBytes) {
                    width *= 0.9; // Reduce width by 10%
                    height *= 0.9; // Reduce height by 10%
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                // Generate a new blob with reduced quality
                blob = await new Promise((resolve) =>
                    canvas.toBlob(resolve, file.type, quality)
                );

                // Reduce quality for the next iteration
                quality -= 0.1;
            } while (blob.size > targetSizeInBytes && quality > 0.1);

            if (blob.size <= targetSizeInBytes) {
                resolve({ blob, aspectRatioReduced: true });
            } else {
                reject(new Error('Unable to resize image to the target size.'));
            }
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