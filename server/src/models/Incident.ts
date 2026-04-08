import mongoose, { Document, Schema } from 'mongoose';

export interface IIncident extends Document {
  incidentId: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved';
  location: string;
  reportedBy: string;
  reportedAt: string;
  pollingStationId: string;
}

const incidentSchema = new Schema<IIncident>({
  incidentId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], required: true },
  status: { type: String, enum: ['open', 'investigating', 'resolved'], default: 'open' },
  location: { type: String, required: true },
  reportedBy: { type: String, required: true },
  reportedAt: { type: String, default: 'Just now' },
  pollingStationId: { type: String, required: true },
});

export const Incident = mongoose.model<IIncident>('Incident', incidentSchema);
