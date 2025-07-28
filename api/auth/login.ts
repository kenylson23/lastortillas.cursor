import jwt from 'jsonwebtoken';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Chave secreta para assinar JWT (em produção, usar variável de ambiente)
const JWT_SECRET = process.env.JWT_SECRET || 'lasTortillas2025-secret-key';
const JWT_EXPIRES_IN = '24h'; // Token expira em 24 horas

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ 
      error: 'Method Not Allowed',
      message: 'Only POST requests are allowed'
    });
    return;
  }

  try {
    // Parse request body
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    const { username, password } = body || {};

    // Validate required fields
    if (!username || !password) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Username and password are required'
      });
      return;
    }

    // Credenciais corretas do restaurante Las Tortillas
    if (username === 'administrador' && password === 'lasTortillas2025!') {
      // Gerar JWT real
      const token = jwt.sign(
        {
          id: 1,
          username: 'administrador',
          role: 'admin',
          name: 'Administrador'
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Gerar refresh token (válido por 7 dias)
      const refreshToken = jwt.sign(
        {
          id: 1,
          username: 'administrador',
          type: 'refresh'
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(200).json({
        success: true,
        user: {
          id: 1,
          username: 'administrador',
          role: 'admin',
          name: 'Administrador'
        },
        token,
        refreshToken,
        expiresIn: 24 * 60 * 60, // 24 horas em segundos
        message: 'Login realizado com sucesso'
      });
    } else if (username === 'cozinha' && password === 'lasTortillas2025Cozinha!') {
      // Gerar JWT real
      const token = jwt.sign(
        {
          id: 2,
          username: 'cozinha',
          role: 'cozinha',
          name: 'Cozinha'
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Gerar refresh token (válido por 7 dias)
      const refreshToken = jwt.sign(
        {
          id: 2,
          username: 'cozinha',
          type: 'refresh'
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(200).json({
        success: true,
        user: {
          id: 2,
          username: 'cozinha',
          role: 'cozinha',
          name: 'Cozinha'
        },
        token,
        refreshToken,
        expiresIn: 24 * 60 * 60, // 24 horas em segundos
        message: 'Login realizado com sucesso'
      });
    } else {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Credenciais inválidas'
      });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Erro interno do servidor'
    });
  }
} 