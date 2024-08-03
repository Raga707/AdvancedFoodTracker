import React, { useState } from 'react';
import axios from 'axios';

const FoodImageRecognition = () => {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleImageUpload = async () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:3002/recognize', formData);
      setPredictions(response.data.predictions);
    } catch (error) {
      console.error('Error recognizing image:', error);
    }
  };

  return (
    <div className="image-recognition">
      <h2>Food Image Recognition</h2>
      <input type="file" accept="image/*" id="fileInput" onChange={handleImageChange} />
      {image && (
        <div>
          <img id="uploadedImage" src={image} alt="Uploaded" width="300" />
          <button onClick={handleImageUpload}>Analyze Image</button>
        </div>
      )}
      {predictions.length > 0 && (
        <div>
          <h3>Predictions:</h3>
          <ul>
            {predictions.map((prediction, index) => (
              <li key={index}>
                {prediction.food_name}: {(prediction.probability * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};// works

export default FoodImageRecognition;
