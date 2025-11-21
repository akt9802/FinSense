import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const router = express.Router();

// Route to fetch recurring expenses
router.get("/recurringexpenses", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Authorization token is required." });
    }

    // Decode the token to get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (!userId) {
      return res.status(400).json({ error: "Invalid token." });
    }

    // Fetch the user and their recurring expenses
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if expenses array exists and filter recurring expenses
    const recurringExpenses = user.expenses ? user.expenses.filter((expense) => expense.recurring === true) : [];
    
    res.status(200).json({ 
      success: true,
      recurringExpenses: recurringExpenses 
    });
  } catch (error) {
    console.error("Error fetching recurring expenses:", error);
    res.status(500).json({ error: "Server error." });
  }
});

export default router;