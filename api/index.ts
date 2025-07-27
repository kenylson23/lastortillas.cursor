import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Teste simples primeiro
    res.status(200).json({
      status: 'OK',
      message: 'API funcionando',
      timestamp: new Date().toISOString(),
      path: req.url,
      method: req.method
    });
  } catch (error) {
    console.error('Erro na API:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
} 