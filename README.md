# Image Resizer Tool

This project is a web-based **Image Resizer Tool** that allows users to upload an image, resize it to a desired file size, and download the resized image while maintaining the original file format. The tool provides real-time feedback on the resizing process directly on the webpage.

---

## **Features**
- **Upload Images**: Users can upload images in common formats such as `.jpg`, `.jpeg`, `.png`, etc.
- **Drag-and-Drop Support**: Users can drag and drop an image into the upload area for convenience.
- **Set File Size Threshold**: Users can specify the desired file size in KB or MB.
- **Maintain Original File Format**: The output image format matches the input image format (e.g., `.jpg` remains `.jpg`).
- **Processing Status Updates**: The tool displays real-time status updates (e.g., "Processing your image...") directly on the webpage.
- **Download Resized Image**: Users can download the resized image using a button.
- **Error Handling**: The tool provides clear error messages if the resizing process fails or if the resized image cannot meet the requested file size due to quality or aspect ratio limits.

---

## **How It Works**
1. **Upload an Image**:
   - Click the "Choose File" button or drag and drop an image into the upload area.
   - The uploaded image is displayed in the preview area along with its file size.

2. **Set File Size Threshold**:
   - Enter the desired file size in KB or MB.
   - Select the size unit (KB or MB) from the dropdown menu.

3. **Resize the Image**:
   - Click the "Resize Image" button to start the resizing process.
   - The tool adjusts the image quality and dimensions to meet the specified file size.
   - Real-time status updates are displayed on the webpage (e.g., "Processing your image..." or "Image processing is complete!").

4. **Download the Resized Image**:
   - Once the resizing is complete, click the "Download Resized Image" button to save the resized image.

---

## **Technologies Used**
- **HTML5**: For the structure of the webpage.
- **CSS3**: For styling the webpage, including responsive design and visual cues for drag-and-drop functionality.
- **JavaScript (ES6)**: For handling user interactions, resizing images, and providing real-time feedback.
- **Canvas API**: For resizing images dynamically in the browser.

---

## **How to Run the Project**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository-name.git
   
2. Navigate to the project directory:
   ```bash
   cd your-repository-name

3. Open the index.html file in your browser to launch the app.

## Known Limitations
1. The resized image may not meet the requested file size if the quality or aspect ratio limits are reached.
2. The tool currently supports only common image formats such as .jpg, .jpeg, and .png.

## Future Enhancements
- Add support for bulk image uploads and resizing.
- Provide additional options for image quality and resolution.
- Implement a progress bar for large image processing tasks.

## Contributing
Contributions are welcome! If you'd like to contribute to this project:

1. Fork the repository.

2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name

3. Commit your changes:
   ```bash
   git commit -m "Description of changes"

4. Push to your branch:
   ```bash
   git push origin feature-name

5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.