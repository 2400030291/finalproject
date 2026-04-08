import mongoose, { Document, Schema } from 'mongoose';

export interface IPollingStation extends Document {
  stationId: string;
  name: string;
  location: string;
  district: string;
  status: 'active' | 'closed' | 'pending' | 'reporting';
  totalVoters: number;
  votedCount: number;
  turnoutPercentage: number;
  lastUpdate: string;
}

const pollingStationSchema = new Schema<IPollingStation>({
  stationId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  district: { type: String, required: true },
  status: { type: String, enum: ['active', 'closed', 'pending', 'reporting'], default: 'pending' },
  totalVoters: { type: Number, required: true, default: 0 },
  votedCount: { type: Number, required: true, default: 0 },
  turnoutPercentage: { type: Number, required: true, default: 0 },
  lastUpdate: { type: String, default: 'Just now' },
});

export const PollingStation = mongoose.model<IPollingStation>('PollingStation', pollingStationSchema);
