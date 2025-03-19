# Image Resizer Tool

This project is a web-based **Image Resizer Tool** that allows users to upload an image, resize it to a desired file size, and download the resized image while maintaining the original file format. The tool is designed to provide feedback on the resizing process, including whether the aspect ratio was adjusted to meet the file size requirements.

---

## **Features**
- **Upload Images**: Users can upload images in common formats such as `.jpg`, `.jpeg`, `.png`, etc.
- **Set File Size Threshold**: Users can specify the desired file size in KB or MB.
- **Maintain Original File Format**: The output image format matches the input image format (e.g., `.jpg` remains `.jpg`).
- **Aspect Ratio Feedback**: The tool provides feedback if the aspect ratio was reduced to meet the file size requirements.
- **Download Resized Image**: Users can download the resized image using a button.
- **Processing Indicator**: A "Processing..." spinner is displayed while the image is being resized.
- **Error Handling**: Alerts the user if the resizing process fails or if the resized image cannot meet the requested file size due to quality or aspect ratio limits.

---

## **How It Works**
1. **Upload an Image**:
   - Click the "Choose File" button to upload an image.
   - The uploaded image is displayed in the preview area along with its file size.

2. **Set File Size Threshold**:
   - Enter the desired file size in KB or MB.
   - Select the size unit (KB or MB) from the dropdown menu.

3. **Resize the Image**:
   - Click the "Resize Image" button to start the resizing process.
   - The tool adjusts the image quality and dimensions to meet the specified file size.

4. **Download the Resized Image**:
   - Once the resizing is complete, click the "Download Resized Image" button to save the resized image.

---

## **Latest Updates**
- **Output File Format**:
  - The output image format now matches the input file format exactly (e.g., `.jpg` remains `.jpg`).
- **Improved Download Functionality**:
  - The "Download Resized Image" option has been changed from a hyperlink to a button for better user experience.
- **Aspect Ratio Feedback**:
  - The tool provides feedback if the aspect ratio was reduced to meet the file size requirements.
- **Processing Indicator**:
  - A spinner is displayed while the image is being processed, and it disappears once the process is complete.

---

## **Technologies Used**
- **HTML5**: For the structure of the web app.
- **CSS3**: For styling the user interface.
- **JavaScript**: For handling user interactions, resizing logic, and file processing.

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
1. Add support for additional image formats (e.g., .webp, .gif).
2. Provide more advanced resizing options, such as cropping or custom dimensions.
3. Improve the user interface with modern design elements.

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

## Contact
For questions or feedback, feel free to reach out:
GitHub: primext