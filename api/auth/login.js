export default async function handler(req, res) {
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

    // Credenciais corretas do seu restaurante
    if (username === 'admin' && password === 'admin123') {
      res.status(200).json({
        success: true,
        user: {
          id: 1,
          username: 'admin',
          role: 'admin',
          name: 'Administrador'
        },
        token: 'fake-jwt-admin-token',
        message: 'Login realizado com sucesso'
      });
    } else if (username === 'cozinha' && password === 'cozinha123') {
      res.status(200).json({
        success: true,
        user: {
          id: 2,
          username: 'cozinha',
          role: 'cozinha',
          name: 'Cozinha'
        },
        token: 'fake-jwt-cozinha-token',
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