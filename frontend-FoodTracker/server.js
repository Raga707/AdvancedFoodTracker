const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = 'mongodb://localhost:27017/food-tracker';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Food entry schema
const foodEntrySchema = new mongoose.Schema({
  name: String,
  measure: String,
  grams: Number,
  calories: Number,
  protein: Number,
  fat: Number,
  satFat: Number,
  fiber: Number,
  carbs: Number,
  category: String,
});

const FoodEntry = mongoose.model('FoodEntry', foodEntrySchema);

// Routes
app.get('/food-entries', async (req, res) => {
  try {
    const foodEntries = await FoodEntry.find();
    res.json(foodEntries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food entries' });
  }
});

app.post('/food-entries', async (req, res) => {
  const newFoodEntry = new FoodEntry(req.body);
  try {
    const savedFoodEntry = await newFoodEntry.save();
    res.json(savedFoodEntry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save food entry' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
