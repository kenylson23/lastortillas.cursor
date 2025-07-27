import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";

const app = express();

// Security middleware
app.use((req, res, next) => {
  // Security headers
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  res.set('X-XSS-Protection', '1; mode=block');
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // CORS for development and production
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://your-app.vercel.app', // Substitua pela sua URL do Vercel
    process.env.CORS_ORIGIN
  ].filter(Boolean);

  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
  }
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
  });
  next();
});

// Serve static files
app.use(express.static(path.join(process.cwd(), 'dist/public')));

// Register API routes
const server = await registerRoutes(app);

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal Server Error'
    : err.message || "Internal Server Error";

  log(`Error ${status}: ${err.message || 'Unknown error'}`);
  res.status(status).json({ message });

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }
});

// Setup Vite in development, serve static in production
if (process.env.NODE_ENV === "development") {
  await setupVite(app, server);
} else {
  serveStatic(app);
}

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(process.cwd(), 'dist/public/index.html'));
  }
});

// Get port from environment or default to 5000
const port = process.env.PORT || 5000;
const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

// Only start server if not in Vercel
if (!process.env.VERCEL) {
  server.listen({
    port: Number(port),
    host,
    reusePort: true,
  }, () => {
    log(`🚀 Server running on http://${host}:${port}`);
    log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    log(`🗄️  Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`);
  });
}

// Export for Vercel
export default app;
