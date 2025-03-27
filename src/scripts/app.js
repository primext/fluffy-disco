// This file handles user interactions, such as uploading images, resizing them, and displaying previews.

import { resizeImage } from './imageUtils.js';

document.addEventListener('DOMContentLoaded', () => {
    // Get references to existing HTML elements
    const fileInput = document.getElementById('image-upload');
    const dragDropArea = document.getElementById('drag-drop-area');
    const sizeInput = document.getElementById('size-threshold');
    const unitSelect = document.getElementById('size-unit');
    const resizeButton = document.getElementById('resize-button');
    const originalImagePreview = document.getElementById('original-image-preview');
    const originalImageSize = document.getElementById('original-image-size');
    const resizedImagePreview = document.getElementById('resized-image-preview');
    const resizedImageSize = document.getElementById('resized-image-size');
    const downloadButton = document.getElementById('download-button');
    const processingStatus = document.getElementById('processing-status'); // Status message element

    // Function to handle file processing (shared by both drag-and-drop and file input)
    const processFile = (file) => {
        if (!file) {
            processingStatus.textContent = 'Please upload an image file.';
            return;
        }

        // Validate that the uploaded file is an image
        if (!file.type.startsWith('image/')) {
            processingStatus.textContent = 'Please upload a valid image file.';
            return;
        }

        // Display the original image in the preview area
        const originalImageURL = URL.createObjectURL(file);
        originalImagePreview.src = originalImageURL;
        originalImagePreview.style.display = 'block'; // Ensure the image is visible

        // Display the file size of the uploaded image
        const fileSizeInKB = (file.size / 1024).toFixed(2); // Convert bytes to KB
        originalImageSize.textContent = `File Size: ${fileSizeInKB} KB`;

        // Store the file in the file input for further processing (e.g., resizing)
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;

        processingStatus.textContent = 'Image uploaded successfully. Ready to resize.';
    };

    // Event listener for file input to display the uploaded image
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        processFile(file);
    });

    // Drag-and-drop functionality
    dragDropArea.addEventListener('dragover', (event) => {
        event.preventDefault(); // Prevent default behavior to allow dropping
        dragDropArea.classList.add('drag-over'); // Add a visual cue
    });

    dragDropArea.addEventListener('dragleave', () => {
        dragDropArea.classList.remove('drag-over'); // Remove the visual cue
    });

    dragDropArea.addEventListener('drop', (event) => {
        event.preventDefault(); // Prevent default behavior
        dragDropArea.classList.remove('drag-over'); // Remove the visual cue

        const file = event.dataTransfer.files[0]; // Get the dropped file
        processFile(file); // Process the dropped file
    });

    // Event listener for the resize button
    resizeButton.addEventListener('click', async () => {
        const file = fileInput.files[0]; // Get the uploaded file
        if (!file) {
            processingStatus.textContent = 'Please upload an image file.';
            return;
        }

        const sizeThreshold = parseFloat(sizeInput.value);
        const sizeUnit = unitSelect.value;
        if (isNaN(sizeThreshold) || sizeThreshold <= 0) {
            processingStatus.textContent = 'Please enter a valid size threshold.';
            return;
        }

        const targetSizeInBytes = sizeUnit === 'KB' ? sizeThreshold * 1024 : sizeThreshold * 1024 * 1024;

        try {
            processingStatus.textContent = 'Processing your image...'; // Update status message

            // Call the resizeImage function
            const { blob: resizedBlob } = await resizeImage(file, targetSizeInBytes);

            // Create a URL for the resized image
            const resizedImageURL = URL.createObjectURL(resizedBlob);

            // Display the resized image in the preview area
            resizedImagePreview.src = resizedImageURL;

            // Display the resized image file size
            const resizedFileSizeInKB = (resizedBlob.size / 1024).toFixed(2);
            resizedImageSize.textContent = `Resized Image File Size: ${resizedFileSizeInKB} KB`;

            // Extract the file extension from the original file name
            const fileExtension = file.name.split('.').pop(); // e.g., "jpg", "png"

            // Show the download button and configure it
            downloadButton.style.display = 'inline'; // Make the button visible
            downloadButton.onclick = () => {
                const link = document.createElement('a');
                link.href = resizedImageURL;
                link.download = `resized-image.${fileExtension}`; // Use the same file extension as the input file
                link.click();
            };

            if (resizedBlob.size > targetSizeInBytes) {
                processingStatus.textContent = 'The resized image could not meet the requested file size. Try increasing the target size.';
            } else {
                processingStatus.textContent = 'Image processing is complete! You can now download the resized image.';
            }
        } catch (error) {
            console.error('Error resizing image:', error);
            processingStatus.textContent = 'An error occurred while resizing the image. Please try again.';
        }
    });
});