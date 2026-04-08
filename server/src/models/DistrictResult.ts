import mongoose, { Document, Schema } from 'mongoose';

export interface IDistrictResult extends Document {
  district: string;
  candidate1: number;
  candidate2: number;
  candidate3: number;
  candidate4: number;
}

const districtResultSchema = new Schema<IDistrictResult>({
  district: { type: String, required: true },
  candidate1: { type: Number, required: true, default: 0 },
  candidate2: { type: Number, required: true, default: 0 },
  candidate3: { type: Number, required: true, default: 0 },
  candidate4: { type: Number, required: true, default: 0 },
});

export const DistrictResult = mongoose.model<IDistrictResult>('DistrictResult', districtResultSchema);
