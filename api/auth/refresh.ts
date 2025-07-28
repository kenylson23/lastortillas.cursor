import jwt from 'jsonwebtoken';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const JWT_SECRET = process.env.JWT_SECRET || 'lasTortillas2025-secret-key';
const JWT_EXPIRES_IN = '24h';

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

    const { refreshToken } = body || {};

    // Validate required fields
    if (!refreshToken) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Refresh token is required'
      });
      return;
    }

    // Verificar refresh token
    try {
      const decoded = jwt.verify(refreshToken, JWT_SECRET) as any;
      
      // Verificar se é um refresh token
      if (decoded.type !== 'refresh') {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Invalid refresh token'
        });
        return;
      }

      // Gerar novo access token
      const newToken = jwt.sign(
        {
          id: decoded.id,
          username: decoded.username,
          role: decoded.role,
          name: decoded.name
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Gerar novo refresh token
      const newRefreshToken = jwt.sign(
        {
          id: decoded.id,
          username: decoded.username,
          type: 'refresh'
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(200).json({
        success: true,
        token: newToken,
        refreshToken: newRefreshToken,
        expiresIn: 24 * 60 * 60, // 24 horas em segundos
        message: 'Token renovado com sucesso'
      });
    } catch (jwtError: any) {
      if (jwtError.name === 'TokenExpiredError') {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Refresh token expirado',
          expired: true
        });
      } else {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Refresh token inválido'
        });
      }
    }
  } catch (error) {
    console.error('Erro no refresh:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Erro interno do servidor'
    });
  }
} 