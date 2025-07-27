import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    // Verificar credenciais
    if (username === 'administrador' && password === 'lasTortillas2025!') {
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
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
} 