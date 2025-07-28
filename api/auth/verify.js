const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'lasTortillas2025-secret-key';

module.exports = async function handler(req, res) {
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

    const { token } = body || {};

    // Validate required fields
    if (!token) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Token is required'
      });
      return;
    }

    // Verificar JWT
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Verificar se não é um refresh token
      if (decoded.type === 'refresh') {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Refresh tokens cannot be used for authentication'
        });
        return;
      }

      res.status(200).json({
        success: true,
        valid: true,
        user: {
          id: decoded.id,
          username: decoded.username,
          role: decoded.role,
          name: decoded.name
        },
        message: 'Token válido'
      });
    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Token expirado',
          expired: true
        });
      } else if (jwtError.name === 'JsonWebTokenError') {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Token inválido'
        });
      } else {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Token inválido'
        });
      }
    }
  } catch (error) {
    console.error('Erro na verificação:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Erro interno do servidor'
    });
  }
} 