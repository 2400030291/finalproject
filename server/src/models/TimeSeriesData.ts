import mongoose, { Document, Schema } from 'mongoose';

export interface ITimeSeriesData extends Document {
  time: string;
  votes: number;
}

const timeSeriesDataSchema = new Schema<ITimeSeriesData>({
  time: { type: String, required: true },
  votes: { type: Number, required: true, default: 0 },
});

export const TimeSeriesData = mongoose.model<ITimeSeriesData>('TimeSeriesData', timeSeriesDataSchema);
