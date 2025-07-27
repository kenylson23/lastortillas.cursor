// Tipos globais para resolver problemas de TypeScript

declare module '@vercel/node' {
  export interface VercelRequest extends Request {
    body?: any;
    query?: any;
    params?: any;
    headers: Record<string, string | string[] | undefined>;
  }

  export interface VercelResponse extends Response {
    status(code: number): VercelResponse;
    json(data: any): VercelResponse;
    send(data: any): VercelResponse;
    end(): VercelResponse;
    setHeader(name: string, value: string): VercelResponse;
  }
}

// Extender tipos de erro para ter a propriedade message
interface Error {
  message: string;
}

// Tipos para autenticação
interface AuthData {
  user: any;
  session?: any;
}

interface AuthError {
  message: string;
}

interface AuthResponse {
  data?: AuthData;
  error?: AuthError;
}

// Tipos para erros de catch
type CatchError = Error | unknown;

// Tipos para QR Code
declare module 'qrcode' {
  export function toDataURL(text: string, options?: any): Promise<string>;
  export function toCanvas(canvas: HTMLCanvasElement, text: string, options?: any): Promise<void>;
  export function toString(text: string, options?: any): Promise<string>;
}

// Tipos para Vite
declare module 'vite' {
  export interface ServerOptions {
    middlewareMode?: boolean;
    hmr?: any;
    allowedHosts?: boolean | string | string[];
  }

  export function createServer(options?: any): any;
  export function createLogger(): any;
  export function defineConfig(config: any): any;
}

// Declarações para imports de imagens
declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

// Tipos para erros genéricos
declare global {
  interface Error {
    message: string;
  }
} 