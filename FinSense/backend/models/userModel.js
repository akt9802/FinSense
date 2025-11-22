import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  merchant: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: '',
  },
  recurring: {
    type: Boolean,
    required: true,
  },
});

const categoryBudgetSchema = new mongoose.Schema({
  food: { type: Number, default: 0 },
  travel: { type: Number, default: 0 },
  bills: { type: Number, default: 0 },
  shopping: { type: Number, default: 0 },
  entertainment: { type: Number, default: 0 },
  others: { type: Number, default: 0 },
});

const monthlyPlanSchema = new mongoose.Schema({
  month: { type: String, required: true }, // e.g. "2025-11" 
  totalBudget: { type: Number, required: true },
  categoryBudgets: categoryBudgetSchema,
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  expenses: [expenseSchema], // Embedded array of expenses
  monthlyPlans: [monthlyPlanSchema], // Embedded array of monthly plans
});

export default mongoose.model('User', userSchema);