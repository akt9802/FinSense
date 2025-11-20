import mongoose from 'mongoose';

const plannedItemSchema = new mongoose.Schema({
  date: { type: String },
  amount: { type: Number },
  merchant: { type: String },
  category: { type: String },
  notes: { type: String, default: '' },
});

const planMonthSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    month: { type: String, required: true }, // e.g. "2025-11"
    planned: [plannedItemSchema],
  },
  { timestamps: true }
);

export default mongoose.model('PlanMonth', planMonthSchema);
