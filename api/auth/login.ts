import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Adicionar CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed' 
    });
  }

  try {
    console.log('Login request received:', { 
      body: req.body,
      headers: req.headers['content-type']
    });

    const { username, password } = req.body;

    if (!username || !password) {
      console.log('Missing credentials');
      return res.status(400).json({
        success: false,
        message: 'Username e password são obrigatórios'
      });
    }

    console.log('Validating credentials for:', username);

    // Verificar credenciais
    if (username === 'administrador' && password === 'lasTortillas2025!') {
      console.log('Admin login successful');
      return res.status(200).json({
        success: true,
        user: {
          id: 'admin',
          username: 'administrador',
          role: 'admin',
          name: 'Administrador'
        },
        message: 'Login realizado com sucesso'
      });
    } else if (username === 'cozinha' && password === 'lasTortillas2025Cozinha!') {
      console.log('Kitchen login successful');
      return res.status(200).json({
        success: true,
        user: {
          id: 'kitchen',
          username: 'cozinha',
          role: 'kitchen',
          name: 'Cozinha'
        },
        message: 'Login realizado com sucesso'
      });
    } else {
      console.log('Invalid credentials for:', username);
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
} 