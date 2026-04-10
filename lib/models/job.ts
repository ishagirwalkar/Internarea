import mongoose, { type InferSchemaType, type Model } from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    aboutCompany: {
      type: String,
      required: true,
      trim: true,
    },
    aboutJob: {
      type: String,
      required: true,
      trim: true,
    },
    whoCanApply: {
      type: [String],
      default: [],
    },
    perks: {
      type: [String],
      default: [],
    },
    numberOfOpenings: {
      type: Number,
      required: true,
      min: 1,
    },
    stipend: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: String,
      required: true,
      trim: true,
    },
    additionalInfo: {
      type: String,
      required: true,
      trim: true,
    },
    employmentType: {
      type: String,
      default: 'Full-time',
      trim: true,
    },
    workMode: {
      type: String,
      default: 'On-site',
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export type JobDocument = InferSchemaType<typeof jobSchema>;

export const Job = (mongoose.models.Job as Model<JobDocument> | undefined) || mongoose.model<JobDocument>('Job', jobSchema);