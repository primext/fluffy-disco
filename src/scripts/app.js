// This file contains the JavaScript code for the web app.
// It handles user interactions, such as uploading images, resizing them, and displaying previews.

document.addEventListener('DOMContentLoaded', () => {
    // Create a container for the app UI
    const appContainer = document.createElement('div');
    appContainer.style.margin = '20px';

    // Create a file input for users to upload their image
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; // Accept only image files
    fileInput.id = 'image-upload';
    appContainer.appendChild(fileInput);

    // Create a text box for the user to input the desired file size threshold
    const sizeInput = document.createElement('input');
    sizeInput.type = 'number';
    sizeInput.placeholder = 'Enter size threshold (e.g., 100)';
    sizeInput.id = 'size-threshold';
    sizeInput.style.margin = '10px';
    appContainer.appendChild(sizeInput);

    // Create a drop-down menu for selecting the size unit (KB or MB)
    const unitSelect = document.createElement('select');
    unitSelect.id = 'size-unit';
    const kbOption = document.createElement('option');
    kbOption.value = 'KB';
    kbOption.textContent = 'KB';
    const mbOption = document.createElement('option');
    mbOption.value = 'MB';
    mbOption.textContent = 'MB';
    unitSelect.appendChild(kbOption);
    unitSelect.appendChild(mbOption);
    appContainer.appendChild(unitSelect);

    // Create a spinner to indicate processing
    const spinner = document.createElement('div');
    spinner.id = 'processing-spinner';
    spinner.style.display = 'none'; // Initially hidden
    spinner.style.margin = '10px';
    spinner.textContent = 'Processing...'; // Simple text spinner
    spinner.style.fontWeight = 'bold';
    spinner.style.color = 'blue';
    appContainer.appendChild(spinner);

    // Create a button to trigger the resizing process
    const resizeButton = document.createElement('button');
    resizeButton.textContent = 'Resize Image';
    resizeButton.id = 'resize-button';
    resizeButton.style.margin = '10px';
    appContainer.appendChild(resizeButton);

    // Create a label and area to display the original image
    const originalImageLabel = document.createElement('p');
    originalImageLabel.textContent = 'Uploaded Image:';
    appContainer.appendChild(originalImageLabel);

    const originalImagePreview = document.createElement('img');
    originalImagePreview.id = 'original-image-preview';
    originalImagePreview.style.maxWidth = '300px';
    originalImagePreview.style.margin = '10px';
    appContainer.appendChild(originalImagePreview);

    const originalImageSize = document.createElement('p');
    originalImageSize.id = 'original-image-size';
    appContainer.appendChild(originalImageSize);

    // Create a label and area to display the resized image
    const resizedImageLabel = document.createElement('p');
    resizedImageLabel.textContent = 'Resized Image:';
    appContainer.appendChild(resizedImageLabel);

    const resizedImagePreview = document.createElement('img');
    resizedImagePreview.id = 'resized-image-preview';
    resizedImagePreview.style.maxWidth = '300px';
    resizedImagePreview.style.margin = '10px';
    appContainer.appendChild(resizedImagePreview);

    const resizedImageSize = document.createElement('p');
    resizedImageSize.id = 'resized-image-size';
    appContainer.appendChild(resizedImageSize);

    // Create a button for downloading the resized image
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download Resized Image';
    downloadButton.id = 'download-button';
    downloadButton.style.display = 'none'; // Initially hidden
    downloadButton.style.margin = '10px';
    appContainer.appendChild(downloadButton);

    // Create a paragraph to display aspect ratio feedback
    const aspectRatioFeedback = document.createElement('p');
    aspectRatioFeedback.id = 'aspect-ratio-feedback';
    appContainer.appendChild(aspectRatioFeedback);

    // Add the app container to the body of the document
    document.body.appendChild(appContainer);

    // Add an event listener to the file input to display the uploaded image immediately
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0]; // Get the uploaded file
        if (!file) {
            alert('Please upload an image file.');
            return;
        }

        // Display the original image in the preview area
        const originalImageURL = URL.createObjectURL(file);
        originalImagePreview.src = originalImageURL;

        // Display the file size of the uploaded image
        const fileSizeInKB = (file.size / 1024).toFixed(2); // Convert bytes to KB
        originalImageSize.textContent = `File Size: ${fileSizeInKB} KB`;
    });

    // Add an event listener to the resize button
    resizeButton.addEventListener('click', async () => {
        const file = fileInput.files[0]; // Get the uploaded file
        if (!file) {
            alert('Please upload an image file.');
            return;
        }

        // Get the size threshold and unit from user input
        const sizeThreshold = parseFloat(sizeInput.value);
        const sizeUnit = unitSelect.value;
        if (isNaN(sizeThreshold) || sizeThreshold <= 0) {
            alert('Please enter a valid size threshold.');
            return;
        }

        // Convert the size threshold to bytes
        const targetSizeInBytes = sizeUnit === 'KB' ? sizeThreshold * 1024 : sizeThreshold * 1024 * 1024;

        try {
            // Show the processing spinner
            spinner.style.display = 'block';

            // Call the resizeImage function to process the image
            const { blob: resizedBlob, aspectRatioReduced } = await resizeImage(file, targetSizeInBytes);

            // Create a URL for the resized image
            const resizedImageURL = URL.createObjectURL(resizedBlob);

            // Extract the file extension from the input file
            const fileExtension = file.name.split('.').pop(); // Get the file extension (e.g., "jpg", "png")

            // Display the resized image in the preview area
            resizedImagePreview.src = resizedImageURL;

            // Display aspect ratio feedback
            if (aspectRatioReduced) {
                aspectRatioFeedback.textContent = 'The aspect ratio of the image was reduced to meet the file size requirements.';
            } else {
                aspectRatioFeedback.textContent = '';
            }

            // Display the resized image file size
            const resizedFileSizeInKB = (resizedBlob.size / 1024).toFixed(2); // Convert bytes to KB
            resizedImageSize.textContent = `Resized Image File Size: ${resizedFileSizeInKB} KB`;

            // Show the download button and add functionality to download the resized image
            downloadButton.style.display = 'inline'; // Make the button visible
            downloadButton.onclick = () => {
                const link = document.createElement('a');
                link.href = resizedImageURL;
                link.download = `resized-image.${fileExtension}`; // Use the same file extension as the input file
                link.click();
            };

            // Check if the resized image meets the target size
            if (resizedBlob.size > targetSizeInBytes) {
                alert('Processing completed, but the resized image could not meet the requested file size. This may be due to quality or aspect ratio limits being reached.');
            } else {
                alert('Image processing is complete!');
            }
        } catch (error) {
            console.error('Error resizing image:', error);
            alert('An error occurred while resizing the image. Please try again.');
        } finally {
            // Hide the processing spinner
            spinner.style.display = 'none';
        }
    });
});
