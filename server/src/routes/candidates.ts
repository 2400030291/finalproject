import { Router, Request, Response } from 'express';
import { Candidate } from '../models/Candidate';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// GET /api/candidates
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const candidates = await Candidate.find().sort({ votes: -1 });
    res.json(candidates);
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/candidates (protected)
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res.status(201).json(candidate);
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/candidates/:id (protected)
router.put('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!candidate) {
      res.status(404).json({ message: 'Candidate not found' });
      return;
    }
    res.json(candidate);
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /api/candidates/:id (protected)
router.delete('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      res.status(404).json({ message: 'Candidate not found' });
      return;
    }
    res.json({ message: 'Candidate deleted' });
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
