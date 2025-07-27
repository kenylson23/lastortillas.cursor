import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const menuItems = await storage.getAllMenuItems();
      res.status(200).json(menuItems);
    } else if (req.method === 'POST') {
      const menuItem = await storage.createMenuItem(req.body);
      res.status(201).json(menuItem);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
} 