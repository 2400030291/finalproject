import { Router, Request, Response } from 'express';
import { Incident } from '../models/Incident';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// GET /api/incidents
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { severity, status } = req.query;
    const filter: any = {};
    if (severity && severity !== 'all') filter.severity = severity;
    if (status && status !== 'all') filter.status = status;

    const incidents = await Incident.find(filter).sort({ reportedAt: -1 });
    res.json(incidents);
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/incidents (protected)
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    // Auto-generate incident ID
    const count = await Incident.countDocuments();
    const incidentId = `INC${String(count + 1).padStart(3, '0')}`;

    const incident = new Incident({
      ...req.body,
      incidentId,
      reportedAt: 'Just now',
    });
    await incident.save();
    res.status(201).json(incident);
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/incidents/:id (protected)
router.put('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const incident = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!incident) {
      res.status(404).json({ message: 'Incident not found' });
      return;
    }
    res.json(incident);
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
