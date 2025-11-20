import express from 'express';
import PlanMonth from '../models/planMonthModel.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

// Create or update a planning month for authenticated user
router.post('/plan-month', authenticate, async (req, res) => {
  const userId = req.user._id || req.user.id;
  const { month, planned } = req.body;

  if (!month) return res.status(400).json({ error: 'month is required (format: YYYY-MM)' });

  try {
    let plan = await PlanMonth.findOne({ userId, month });
    if (plan) {
      plan.planned = Array.isArray(planned) ? planned : plan.planned;
      await plan.save();
      return res.status(200).json({ message: 'Plan updated', plan });
    }

    plan = new PlanMonth({ userId, month, planned: Array.isArray(planned) ? planned : [] });
    await plan.save();
    return res.status(201).json({ message: 'Plan created', plan });
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
    const plan = await PlanMonth.findOne({ userId, month });
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
    const plans = await PlanMonth.find({ userId }).sort({ month: -1 });
    return res.status(200).json({ plans });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Delete a plan by id
router.delete('/plan-month/:id', authenticate, async (req, res) => {
  const userId = req.user._id || req.user.id;
  const { id } = req.params;

  try {
    const plan = await PlanMonth.findOne({ _id: id, userId });
    if (!plan) return res.status(404).json({ error: 'Plan not found' });
    await plan.deleteOne();
    return res.status(200).json({ message: 'Plan deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
