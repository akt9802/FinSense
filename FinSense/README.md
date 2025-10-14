# FinSense — Expense Pattern Analyzer

FinSense is an intelligent expense analysis platform that helps users understand their spending habits and receive personalized financial advice. It pairs a MERN-style web application (React frontend + Node/Express backend + MongoDB) with a Python/Flask microservice that hosts a machine learning model for classifying spending patterns as Healthy, Moderate, or Risky.

## Project Overview

FinSense lets users input monthly category-wise expenses (Food, Travel, Bills, Shopping, Entertainment) and returns:

- A classification of their spending habit (Healthy / Moderate / Risky) from an ML model.
- Visual analytics (charts showing breakdowns and trends).
- Personalized advice and optional predictions/anomaly detection.

This repository contains the Next.js frontend. The backend API and ML microservice are separate components but described below so you can run the full stack locally.

## Key Features

- Add and store monthly expenses per user
- ML-powered expense classification (Decision Tree)
- Visual dashboards (pie/bar/line charts)
- Personalized, rule-based or ML-assisted advice
- JWT authentication and secure password hashing
- CSV import, PDF report export, and optional notifications

## Technology Stack

Layer — Technology — Purpose

- Frontend: React.js (Next.js) + Tailwind CSS — UI, expense forms, analytics
- Backend: Node.js + Express — REST API, auth, DB proxy to ML
- Database: MongoDB (Atlas suggested) — Users, Expenses, Analytics
- ML Microservice: Python + Flask — Model loading and /predict endpoint
- Visualization: Chart.js or Recharts — Charts and trend visualizations
- Auth: JWT + bcrypt — Secure login/signup
- Deployment: Vercel (frontend), Render / PythonAnywhere (backend + ML)

## Machine Learning Component

Model summary

- Problem: Classify monthly spending pattern into {Healthy, Moderate, Risky}
- Algorithm: Decision Tree Classifier (optionally K-Means for clustering)
- Libraries: pandas, scikit-learn, numpy, pickle
- Artifact: finsense_model.pkl (pickled scikit-learn model)

Training flow

1. Preprocess dataset (normalization/scaling, train-test split)
2. Train Decision Tree classifier
3. Save trained model to `finsense_model.pkl`
4. Create a Flask endpoint `POST /predict` that accepts category expenses and returns the label and confidence

Example dataset row

| food | travel | shopping | bills | entertainment | label |
|------|--------|----------|-------|---------------|-------|
| 2000 | 500    | 1000     | 3000  | 1000          | Healthy |

Example Flask response

{
   "prediction": "Moderate",
   "confidence": 0.78,
   "details": {"food":4000, "travel":1500, ...}
}

## System Architecture

Frontend (React/Next.js) --> Express Backend (auth, CRUD, proxy) --> Flask ML Microservice

MongoDB stores users and expenses. The backend persists expenses and can call the ML microservice to get classifications which are saved alongside each expense entry.

Ascii diagram

      [React Frontend]
                |
               axios
                |
      [Express Backend]
         |        |
   MongoDB    HTTP POST /predict
                   |
         [Flask ML Microservice]

## API (example)

These are example endpoints; your implementation may vary.

- POST /api/auth/signup — Register a user (email, password)
- POST /api/auth/login — Login, returns JWT
- GET /api/expenses — List user expenses (JWT required)
- POST /api/expenses — Add expense (sends to ML for classification)
- POST /ml/predict — ML microservice predict endpoint (internal)

Request body example for prediction

{
   "food": 4000,
   "travel": 1500,
   "shopping": 2000,
   "bills": 2000,
   "entertainment": 1000
}

## MongoDB Collections (example schema)

Users

{
   _id: ObjectId,
   name: string,
   email: string,
   passwordHash: string,
   role: "user" | "admin",
   createdAt: ISODate
}

Expenses

{
   _id: ObjectId,
   userId: ObjectId,
   food: number,
   travel: number,
   shopping: number,
   bills: number,
   entertainment: number,
   total: number,
   pattern: string, // Healthy|Moderate|Risky
   mlConfidence: number,
   createdAt: ISODate
}

## Run locally (recommended layout)

This repo holds the frontend. If you also have the backend and ml folders, run them as described.

1) Frontend (Next.js)

Open a terminal and from the project root:

```powershell
cd FinSense
npm install
npm run dev
```

The app will be available at http://localhost:3000 by default.

2) Backend (Express) — example

Create a `backend/` folder (if not present) with an Express app that exposes the API described above. Typical steps:

```powershell
cd backend
npm install
# set environment variables in .env (MONGO_URI, JWT_SECRET, ML_URL)
npm run dev
```

3) ML Microservice (Flask) — example (Windows PowerShell)

```powershell
cd ml
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
# Run Flask app (ensure FLASK_APP=app.py or use an entrypoint)
flask run --port 5000
```

The Flask service should expose `POST /predict` and return JSON with the classification.

Environment variables (examples)

- FRONTEND_URL=http://localhost:3000
- BACKEND_URL=http://localhost:4000
- ML_URL=http://localhost:5000
- MONGO_URI=mongodb+srv://<user>:<pw>@cluster.mongodb.net/finsense
- JWT_SECRET=your_jwt_secret

## Example development flow

1. User fills expense form in the frontend and submits.
2. Frontend sends POST /api/expenses to Express backend with JWT.
3. Backend writes expense to DB, calls ML service /predict with the category values.
4. ML returns prediction; backend updates the expense record with pattern and confidence.
5. Frontend shows charts and advice based on saved data.

## Advanced ideas

- Add anomaly detection for sudden spikes using simple z-score or isolation forest
- Train a regression model to forecast next month spending
- Implement CSV import and PDF export
- Add role-based dashboards for admins

## Project Roadmap (6-week plan)

Week 1 — Train ML model and create dataset
Week 2 — Build Flask microservice and test predictions
Week 3 — Implement backend APIs and MongoDB integration
Week 4 — Build frontend (forms, dashboard) in Next.js
Week 5 — Integrate end-to-end and add charts
Week 6 — Add advanced features and deploy

## Contributing

Contributions are welcome. Suggested steps:

1. Fork the repo
2. Create a feature branch
3. Add tests and documentation
4. Open a PR with a clear description

## License

Add an appropriate license (MIT is a common choice) in `LICENSE`.

## Contact

If you want to collaborate on FinSense, open an issue or reach out to the repository owner.

---

This README was generated from the FinSense project brief. If you want, I can also:

- Add example backend and ML scaffolding files (Express + Flask)
- Create a minimal dataset and training script with the Decision Tree model
- Add environment example files (`.env.example`) and a CONTRIBUTING.md
