import mongoose, { Document, Schema } from 'mongoose';

export interface ICandidate extends Document {
  name: string;
  party: string;
  color: string;
  votes: number;
  percentage: number;
}

const candidateSchema = new Schema<ICandidate>({
  name: { type: String, required: true },
  party: { type: String, required: true },
  color: { type: String, required: true },
  votes: { type: Number, required: true, default: 0 },
  percentage: { type: Number, required: true, default: 0 },
});

export const Candidate = mongoose.model<ICandidate>('Candidate', candidateSchema);
