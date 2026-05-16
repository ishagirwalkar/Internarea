import mongoose from 'mongoose';

const emailLogSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['sent', 'failed'],
    default: 'sent',
  },
  error: {
    type: String,
    default: '',
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.EmailLog || mongoose.model('EmailLog', emailLogSchema, 'emailslog');