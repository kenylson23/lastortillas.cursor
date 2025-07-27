import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const supabaseUrl = process.env.SUPABASE_URL || 'https://nuoblhgwtxyrafbyxjkw.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51b2JsaGd3dHh5cmFmYnl4amt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4ODEwMDUsImV4cCI6MjA2NjQ1NzAwNX0.vn95TruJXJRytI30P5xhBMUwc2ECJe4ulJ1xdLw6I6U';

const supabase = createClient(supabaseUrl, supabaseKey);

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
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed' 
    });
  }

  try {
    console.log('Supabase login request received');

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email e password são obrigatórios'
      });
    }

    console.log('Attempting Supabase login for:', email);

    // Tentar login com Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Supabase login error:', error);
      return res.status(401).json({
        success: false,
        message: error.message || 'Credenciais inválidas'
      });
    }

    if (data.user) {
      console.log('Supabase login successful for:', data.user.email);
      return res.status(200).json({
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
          role: 'admin', // Você pode definir roles baseado em metadata
          name: data.user.user_metadata?.name || 'Administrador'
        },
        session: data.session,
        message: 'Login realizado com sucesso'
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Credenciais inválidas'
    });

  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
} 