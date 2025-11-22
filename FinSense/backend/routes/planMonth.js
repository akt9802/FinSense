import express from 'express';
import User from '../models/userModel.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

// Create or update a planning month for authenticated user
router.post('/plan-month', authenticate, async (req, res) => {
  const userId = req.user._id || req.user.id;
  const { month, totalBudget, categoryBudgets } = req.body;

  if (!month) return res.status(400).json({ error: 'month is required (format: YYYY-MM)' });
  if (totalBudget === undefined || totalBudget === null) return res.status(400).json({ error: 'totalBudget is required' });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Find existing plan for this month
    const existingPlanIndex = user.monthlyPlans.findIndex(plan => plan.month === month);
    
    if (existingPlanIndex !== -1) {
      // Update existing plan
      user.monthlyPlans[existingPlanIndex].totalBudget = totalBudget;
      if (categoryBudgets) {
        user.monthlyPlans[existingPlanIndex].categoryBudgets = categoryBudgets;
      }
      await user.save();
      return res.status(200).json({ message: 'Plan updated', plan: user.monthlyPlans[existingPlanIndex] });
    } else {
      // Create new plan
      const newPlan = { 
        month, 
        totalBudget,
        categoryBudgets: categoryBudgets || {
          food: 0,
          travel: 0,
          bills: 0,
          shopping: 0,
          entertainment: 0,
          others: 0
        }
      };
      user.monthlyPlans.push(newPlan);
      await user.save();
      return res.status(201).json({ message: 'Plan created', plan: user.monthlyPlans[user.monthlyPlans.length - 1] });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Get plan for a specific month
router.get('/plan-month/:month', authenticate, async (req, res) => {
  const userId = req.user._id || req.user.id;
  const { month } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const plan = user.monthlyPlans.find(plan => plan.month === month);
    if (!plan) return res.status(404).json({ error: 'Plan not found' });
    
    return res.status(200).json({ plan });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Get all plans for authenticated user
router.get('/plan-months', authenticate, async (req, res) => {
  const userId = req.user._id || req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Sort plans by month in descending order
    const sortedPlans = user.monthlyPlans.sort((a, b) => b.month.localeCompare(a.month));
    return res.status(200).json({ plans: sortedPlans });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Delete a plan by month
router.delete('/plan-month/:month', authenticate, async (req, res) => {
  const userId = req.user._id || req.user.id;
  const { month } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const planIndex = user.monthlyPlans.findIndex(plan => plan.month === month);
    if (planIndex === -1) return res.status(404).json({ error: 'Plan not found' });

    user.monthlyPlans.splice(planIndex, 1);
    await user.save();
    return res.status(200).json({ message: 'Plan deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Delete a plan by plan ID
router.delete('/plan-month/id/:planId', authenticate, async (req, res) => {
  const userId = req.user._id || req.user.id;
  const { planId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const planIndex = user.monthlyPlans.findIndex(plan => plan._id.toString() === planId);
    if (planIndex === -1) return res.status(404).json({ error: 'Plan not found' });

    user.monthlyPlans.splice(planIndex, 1);
    await user.save();
    return res.status(200).json({ message: 'Plan deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
