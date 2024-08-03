import pandas as pd
from pymongo import MongoClient

# Load the CSV file
file_path = 'C:/Users/Raghav/weather-app/nutrients_csvfile.csv'
data = pd.read_csv(file_path)

# Normalize column names
data.rename(columns={
    'Food': 'name',
    'Measure': 'measure',
    'Grams': 'grams',
    'Calories': 'calories',
    'Protein': 'protein',
    'Fat': 'fat',
    'Sat.Fat': 'satFat',
    'Fiber': 'fiber',
    'Carbs': 'carbs',
    'Category': 'category'
}, inplace=True)

# Convert dataframe to dictionary
data_dict = data.to_dict(orient='records')

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['food-tracker']
collection = db['foodentries']

# Insert data into MongoDB
collection.insert_many(data_dict)
print("Data inserted successfully")
