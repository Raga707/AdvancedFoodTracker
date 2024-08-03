const express = require('express');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer');
const FormData = require('form-data');

const app = express();
const upload = multer();
const PORT = process.env.PORT || 3002;

app.use(cors());

app.post('/recognize', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const formData = new FormData();
    formData.append('image', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await axios.post('https://vision.foodvisor.io/api/v1/recognize', formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': 'Bearer 4l9HQw33.1rrdM8FE5KzLQs5EuUJ6cNq9kvFonCsO'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error recognizing image:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to recognize image' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
