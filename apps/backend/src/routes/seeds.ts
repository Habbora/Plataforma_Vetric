import { Router, Request, Response } from 'express';
import { createDefaultUsers } from '../seeds/createDefaultUsers';
import { seedMoradoresGranMarine } from '../seeds/seedMoradoresGranMarine';

const router = Router();

router.post('/run-default-users', async (req: Request, res: Response) => {
  try {
    await createDefaultUsers();
    return res.json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/run-moradores-gran-marine', async (req: Request, res: Response) => {
  try {
    await seedMoradoresGranMarine();
    return res.json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
