import mongoose, { type InferSchemaType, type Model } from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    listingType: {
      type: String,
      enum: ['job', 'internship'],
      required: true,
    },
    listingId: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    applicantName: {
      type: String,
      required: true,
      trim: true,
    },
    applicantEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    coverLetter: {
      type: String,
      required: true,
      trim: true,
    },
    resumeFileName: {
      type: String,
      required: true,
      trim: true,
    },
    appliedDate: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

export type ApplicationDocument = InferSchemaType<typeof applicationSchema>;

export const Application =
  (mongoose.models.Application as Model<ApplicationDocument> | undefined) ||
  mongoose.model<ApplicationDocument>('Application', applicationSchema);