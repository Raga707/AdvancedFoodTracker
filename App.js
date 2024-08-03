import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import FoodImageRecognition from './components/FoodImageRecognition';
import './App.css';

function App() {
  const [foodEntries, setFoodEntries] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);
  const [dailyList, setDailyList] = useState([]);
  const [totalMacros, setTotalMacros] = useState({ calories: 0, protein: 0, fat: 0, satFat: 0, fiber: 0, carbs: 0 });

  const [name, setName] = useState('');
  const [measure, setMeasure] = useState('');
  const [grams, setGrams] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [satFat, setSatFat] = useState('');
  const [fiber, setFiber] = useState('');
  const [carbs, setCarbs] = useState('');
  const [category, setCategory] = useState('');

  const fetchFoodEntries = async () => {
    try {
      const response = await axios.get('http://localhost:3001/food-entries');
      console.log('Fetched food entries:', response.data);
      setFoodEntries(response.data);
    } catch (error) {
      console.error('Error fetching food entries:', error);
    }
  };

  const addFoodEntry = async () => {
    try {
      const response = await axios.post('http://localhost:3001/food-entries', {
        name,
        measure,
        grams: parseFloat(grams),
        calories: parseFloat(calories),
        protein: parseFloat(protein),
        fat: parseFloat(fat),
        satFat: parseFloat(satFat),
        fiber: parseFloat(fiber),
        carbs: parseFloat(carbs),
        category
      });
      setFoodEntries([...foodEntries, response.data]);
      setName('');
      setMeasure('');
      setGrams('');
      setCalories('');
      setProtein('');
      setFat('');
      setSatFat('');
      setFiber('');
      setCarbs('');
      setCategory('');
    } catch (error) {
      console.error('Error adding food entry:', error);
    }
  };

  const addToDailyList = (food) => {
    setDailyList([...dailyList, food]);
    const newTotalMacros = { ...totalMacros };
    newTotalMacros.calories += food.calories;
    newTotalMacros.protein += food.protein;
    newTotalMacros.fat += food.fat;
    newTotalMacros.satFat += food.satFat;
    newTotalMacros.fiber += food.fiber;
    newTotalMacros.carbs += food.carbs;
    setTotalMacros(newTotalMacros);
  };

  const handleInputChange = (query) => {
    if (!query) return;
    setSearchOptions(foodEntries
      .filter((entry) => entry.name && entry.name.toLowerCase().includes(query.toLowerCase()))
      .map((entry) => ({ value: entry, label: entry.name })));
  };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      addToDailyList(selectedOption.value);
    }
  };

  useEffect(() => {
    fetchFoodEntries();
  }, []);

  return (
    <div className="App">
      <h1>Food Tracker</h1>
      <div className="add-food">
        <h2>Add New Food Entry</h2>
        <input type="text" placeholder="Food Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Measure" value={measure} onChange={(e) => setMeasure(e.target.value)} />
        <input type="number" placeholder="Grams" value={grams} onChange={(e) => setGrams(e.target.value)} />
        <input type="number" placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} />
        <input type="number" placeholder="Protein" value={protein} onChange={(e) => setProtein(e.target.value)} />
        <input type="number" placeholder="Fat" value={fat} onChange={(e) => setFat(e.target.value)} />
        <input type="number" placeholder="Saturated Fat" value={satFat} onChange={(e) => setSatFat(e.target.value)} />
        <input type="number" placeholder="Fiber" value={fiber} onChange={(e) => setFiber(e.target.value)} />
        <input type="number" placeholder="Carbs" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button onClick={addFoodEntry}>Add Entry</button>
      </div>
      <div className="search-food">
        <h2>Search Food Entries</h2>
        <Select
          options={searchOptions}
          onInputChange={handleInputChange}
          onChange={handleSelectChange}
          placeholder="Search for food"
          noOptionsMessage={() => "No matching food entry found"}
        />
      </div>
      <div className="daily-list">
        <h2>Daily Food List</h2>
        <table>
          <thead>
            <tr>
              <th>Food Name</th>
              <th>Measure</th>
              <th>Grams</th>
              <th>Calories</th>
              <th>Protein</th>
              <th>Fat</th>
              <th>Sat Fat</th>
              <th>Fiber</th>
              <th>Carbs</th>
            </tr>
          </thead>
          <tbody>
            {dailyList.map((entry, index) => (
              <tr key={index}>
                <td>{entry.name}</td>
                <td>{entry.measure}</td>
                <td>{entry.grams}</td>
                <td>{entry.calories}</td>
                <td>{entry.protein}</td>
                <td>{entry.fat}</td>
                <td>{entry.satFat}</td>
                <td>{entry.fiber}</td>
                <td>{entry.carbs}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-macros">
          <h3>Total Macros</h3>
          <p>Calories: {totalMacros.calories}</p>
          <p>Protein: {totalMacros.protein}</p>
          <p>Fat: {totalMacros.fat}</p>
          <p>Saturated Fat: {totalMacros.satFat}</p>
          <p>Fiber: {totalMacros.fiber}</p>
          <p>Carbs: {totalMacros.carbs}</p>
        </div>
      </div>
      <FoodImageRecognition />
    </div>
  );
}

export default App;
