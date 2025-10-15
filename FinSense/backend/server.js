import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import addExpenseRoute from './routes/addExpense.js';
import recurringExpenseRoute from './routes/recurringExpense.js';
import cors from 'cors';

// Load environment variables
dotenv.config({ path: '../.env' });

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Middleware to log requests
// app.use((req, res, next) => {
//   console.log('Request Headers:', req.headers);
//   console.log('Request Method:', req.method);
//   console.log('Request URL:', req.url);
//   next();
// });

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies and credentials
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', addExpenseRoute);
app.use('/api/auth', recurringExpenseRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});