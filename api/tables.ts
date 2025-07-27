import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const tables = await storage.getAllTables();
      res.status(200).json(tables);
    } else if (req.method === 'POST') {
      const table = await storage.createTable(req.body);
      res.status(201).json(table);
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const table = await storage.updateTable(Number(id), req.body);
      res.status(200).json(table);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
} 