import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import addExpenseRoute from './routes/addExpense.js';
import recurringExpenseRoute from './routes/recurringExpense.js';
import updateRecurringRoute from './routes/updateRecurring.js';
import planMonthRoute from './routes/planMonth.js';
import cors from 'cors';

// Load environment variables
dotenv.config({ path: '../.env' });

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log('Request Headers:', req.headers);
  console.log('Request Method:', req.method);
  console.log('Request URL:', req.url);
  next();
});

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
app.use('/api/auth', updateRecurringRoute);
app.use('/api/auth', planMonthRoute);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    message: 'Server is running!', 
    timestamp: new Date().toISOString(),
    env: {
      nodeEnv: process.env.NODE_ENV || 'development',
      port: process.env.PORT || 5000,
      jwtSecret: process.env.JWT_SECRET ? 'Present' : 'Missing',
      mongoUri: process.env.MONGO_URI ? 'Present' : 'Missing'
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});