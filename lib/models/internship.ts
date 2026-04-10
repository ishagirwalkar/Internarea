import mongoose, { type InferSchemaType, type Model } from 'mongoose';

const internshipSchema = new mongoose.Schema(
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
    aboutInternship: {
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
    workMode: {
      type: String,
      default: 'Remote',
      trim: true,
    },
    duration: {
      type: String,
      default: '3 months',
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export type InternshipDocument = InferSchemaType<typeof internshipSchema>;

export const Internship =
  (mongoose.models.Internship as Model<InternshipDocument> | undefined) ||
  mongoose.model<InternshipDocument>('Internship', internshipSchema);