import { Router, Request, Response } from 'express';
import { TimeSeriesData } from '../models/TimeSeriesData';
import { DistrictResult } from '../models/DistrictResult';

const router = Router();

// GET /api/results/time-series
router.get('/time-series', async (_req: Request, res: Response): Promise<void> => {
  try {
    const data = await TimeSeriesData.find();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/results/districts
router.get('/districts', async (_req: Request, res: Response): Promise<void> => {
  try {
    const data = await DistrictResult.find();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
