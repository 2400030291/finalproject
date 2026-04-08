import { Router, Request, Response } from 'express';
import { PollingStation } from '../models/PollingStation';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// GET /api/polling-stations
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, district } = req.query;
    const filter: any = {};
    if (status && status !== 'all') filter.status = status;
    if (district && district !== 'all') filter.district = district;

    const stations = await PollingStation.find(filter);
    res.json(stations);
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/polling-stations (protected)
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const station = new PollingStation(req.body);
    await station.save();
    res.status(201).json(station);
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/polling-stations/:id (protected)
router.put('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const station = await PollingStation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!station) {
      res.status(404).json({ message: 'Polling station not found' });
      return;
    }
    res.json(station);
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
