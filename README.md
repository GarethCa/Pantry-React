# Pantry React and ML Backend

## Overview
This repository contains two projects:

1. **Kitchen Ingredients App (React)**
2. **ML Backend (FastAPI)**

---

## Kitchen Ingredients App (React)

### Description
The Kitchen Ingredients App is a React-based frontend application designed to help users manage their pantry. It provides features such as:

- Adding ingredients to the pantry.
- Viewing the list of stored ingredients.
- Getting meal recommendations based on available ingredients.
- Managing storage options for ingredients.

### Key Files and Folders
- **`src/components/`**: Contains React components such as `AddIngredientCard`, `IngredientCard`, `IngredientList`, and `MealRecommendations`.
- **`src/styles/`**: Contains CSS files for styling the application.
- **`public/`**: Contains static assets like `index.html` and `favicon.ico`.

### Technologies Used
- React
- TypeScript
- CSS

---

## ML Backend (FastAPI)

### Description
The ML Backend is a Python-based microservice built using FastAPI. It is designed to serve machine learning models and provide backend services for the Kitchen Ingredients App. It includes:

- A REST API endpoint to serve data and predictions.
- Scalability for future machine learning services.

### Key Files and Folders
- **`app/main.py`**: Contains the FastAPI application with a sample endpoint.
- **`venv/`**: Virtual environment for Python dependencies.

### Technologies Used
- FastAPI
- Python

---

## How to Run

### Kitchen Ingredients App
1. Navigate to the `kitchen-ingredients-app` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### ML Backend
1. Navigate to the `ml-backend` folder.
2. Activate the virtual environment:
   ```bash
   source venv/bin/activate
   ```
3. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

---

## Future Enhancements
- **Kitchen Ingredients App**: Add more advanced features like user authentication and ingredient expiration tracking.
- **ML Backend**: Integrate machine learning models for meal recommendations and ingredient analysis.