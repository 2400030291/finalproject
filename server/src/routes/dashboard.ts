import { Router, Request, Response } from 'express';
import { Candidate } from '../models/Candidate';
import { PollingStation } from '../models/PollingStation';
import { Incident } from '../models/Incident';

const router = Router();

// GET /api/dashboard/summary
router.get('/summary', async (_req: Request, res: Response): Promise<void> => {
  try {
    const candidates = await Candidate.find().sort({ votes: -1 });
    const pollingStations = await PollingStation.find();
    const incidents = await Incident.find();

    const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
    const totalVoters = pollingStations.reduce((sum, ps) => sum + ps.totalVoters, 0);
    const totalVoted = pollingStations.reduce((sum, ps) => sum + ps.votedCount, 0);
    const averageTurnout = totalVoters > 0 ? (totalVoted / totalVoters) * 100 : 0;
    const activeStations = pollingStations.filter(ps => ps.status === 'active').length;
    const openIncidents = incidents.filter(i => i.status !== 'resolved').length;
    const criticalIncidents = incidents.filter(i => i.severity === 'critical').length;

    res.json({
      totalVotes,
      totalVoters,
      totalVoted,
      averageTurnout,
      activeStations,
      totalStations: pollingStations.length,
      openIncidents,
      criticalIncidents,
      totalIncidents: incidents.length,
      leadingCandidate: candidates[0] || null,
    });
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
