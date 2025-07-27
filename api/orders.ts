import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const orders = await storage.getAllOrders();
      res.status(200).json(orders);
    } else if (req.method === 'POST') {
      // Espera-se que o body tenha { order, items }
      const { order, items } = req.body;
      const createdOrder = await storage.createOrder(order, items || []);
      res.status(201).json(createdOrder);
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const updatedOrder = await storage.updateOrder(Number(id), req.body);
      res.status(200).json(updatedOrder);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
} 