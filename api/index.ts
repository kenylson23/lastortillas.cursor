import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const supabaseUrl = process.env.SUPABASE_URL || 'https://nuoblhgwtxyrafbyxjkw.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51b2JsaGd3dHh5cmFmYnl4amt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4ODEwMDUsImV4cCI6MjA2NjQ1NzAwNX0.vn95TruJXJRytI30P5xhBMUwc2ECJe4ulJ1xdLw6I6U';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { pathname } = new URL(req.url || '', `http://${req.headers.host}`);
    const path = pathname.replace('/api', '');

    // Health check
    if (path === '/health' && req.method === 'GET') {
      return res.status(200).json({
        status: 'OK',
        message: 'API funcionando',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        database: process.env.DATABASE_URL ? 'Configured' : 'Not configured'
      });
    }

    // Menu items
    if (path === '/menu-items' && req.method === 'GET') {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;
      return res.status(200).json(data || []);
    }

    // Menu by category
    if (path.startsWith('/menu/category/') && req.method === 'GET') {
      const category = path.split('/').pop();
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('category', category);

      if (error) throw error;
      return res.status(200).json(data || []);
    }

    // Orders
    if (path === '/orders' && req.method === 'GET') {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (path === '/orders' && req.method === 'POST') {
      const { order, items } = req.body;
      
      if (!order) {
        return res.status(400).json({ error: 'Order data is required' });
      }

      // Insert order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (orderError) throw orderError;

      // Insert order items
      if (items && items.length > 0) {
        const orderItems = items.map((item: any) => ({
          order_id: orderData.id,
          menu_item_id: item.menuItemId,
          quantity: item.quantity,
          price: item.price
        }));

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);

        if (itemsError) throw itemsError;
      }

      return res.status(201).json(orderData);
    }

    // Tables
    if (path === '/tables' && req.method === 'GET') {
      const { data, error } = await supabase
        .from('tables')
        .select('*')
        .order('table_number', { ascending: true });

      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (path === '/tables' && req.method === 'POST') {
      const tableData = req.body;
      const { data, error } = await supabase
        .from('tables')
        .insert([tableData])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    // Reservations
    if (path === '/reservations' && req.method === 'GET') {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (path === '/reservations' && req.method === 'POST') {
      const reservationData = req.body;
      const { data, error } = await supabase
        .from('reservations')
        .insert([reservationData])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    // Auth endpoints
    if (path === '/auth/user' && req.method === 'GET') {
      // Simplified auth for demo
      return res.status(200).json({
        id: 'admin',
        email: 'admin@lastortillas.com',
        firstName: 'Admin',
        lastName: 'User'
      });
    }

    // Default response for unknown routes
    return res.status(404).json({
      error: 'Endpoint não encontrado',
      path: path,
      method: req.method
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Erro interno do servidor',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
} 