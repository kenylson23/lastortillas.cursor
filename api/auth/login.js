module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      res.status(400).json({ error: 'Invalid JSON' });
      return;
    }
  }

  const { username, password } = body || {};

  // Credenciais hardcoded para teste
  if (username === 'admin' && password === 'admin123') {
    res.status(200).json({
      user: { username: 'admin', role: 'admin' },
      token: 'fake-jwt-admin',
    });
  } else if (username === 'cozinha' && password === 'cozinha123') {
    res.status(200).json({
      user: { username: 'cozinha', role: 'cozinha' },
      token: 'fake-jwt-cozinha',
    });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
}; 