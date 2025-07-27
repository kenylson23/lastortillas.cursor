# 🚀 Deploy no Vercel - Las Tortillas

## 📋 **Pré-requisitos**

1. **Conta no Vercel:** [vercel.com](https://vercel.com)
2. **Conta no Supabase:** [supabase.com](https://supabase.com)
3. **GitHub:** Repositório configurado

## 🔧 **Configuração**

### **1. Preparar o Projeto**

```bash
# Clone o repositório
git clone https://github.com/kenylson23/lastortillas.cursor.git
cd lastortillas.cursor

# Instalar dependências
npm install

# Testar build local
npm run build
```

### **2. Configurar Variáveis de Ambiente no Vercel**

No dashboard do Vercel, adicione as seguintes variáveis:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres.nuoblhgwtxyrafbyxjkw:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres

# Supabase Configuration
SUPABASE_URL=https://nuoblhgwtxyrafbyxjkw.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51b2JsaGd3dHh5cmFmYnl4amt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4ODEwMDUsImV4cCI6MjA2NjQ1NzAwNX0.vn95TruJXJRytI30P5xhBMUwc2ECJe4ulJ1xdLw6I6U

# Security
SESSION_SECRET=your-super-secret-key-here
CORS_ORIGIN=https://your-app.vercel.app

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./public/uploads

# Vercel Configuration
VERCEL=true
NODE_ENV=production
```

### **3. Deploy no Vercel**

#### **Opção A: Via Dashboard**
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Importe o repositório do GitHub
4. Configure as variáveis de ambiente
5. Deploy!

#### **Opção B: Via CLI**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## 🏗️ **Estrutura do Deploy**

```
├── api/
│   └── index.ts          # Vercel Function entry point
├── dist/
│   ├── public/           # Frontend build
│   └── index.js          # Backend build
├── server/               # Backend source
├── client/               # Frontend source
├── vercel.json           # Vercel configuration
└── package.json          # Build scripts
```

## 🔄 **Fluxo de Deploy**

1. **Build Frontend:** Vite gera `dist/public/`
2. **Build Backend:** esbuild gera `dist/index.js`
3. **Vercel Function:** `api/index.ts` serve o backend
4. **Static Files:** Vercel serve `dist/public/`

## 🌐 **URLs de Acesso**

- **Frontend:** `https://your-app.vercel.app`
- **API:** `https://your-app.vercel.app/api/*`
- **Admin:** `https://your-app.vercel.app/admin`
- **Kitchen:** `https://your-app.vercel.app/kitchen`

## 🔍 **Monitoramento**

### **Logs do Vercel**
```bash
# Ver logs em tempo real
vercel logs --follow

# Ver logs de produção
vercel logs --prod
```

### **Métricas**
- **Performance:** Vercel Analytics
- **Erros:** Vercel Error Tracking
- **Uptime:** Vercel Status Page

## 🚨 **Troubleshooting**

### **Erro: Build Failed**
```bash
# Verificar build local
npm run build

# Verificar dependências
npm install

# Verificar Node.js version
node --version  # Deve ser >= 18
```

### **Erro: Database Connection**
1. Verificar `DATABASE_URL` no Vercel
2. Verificar Supabase connection string
3. Verificar SSL settings

### **Erro: API Routes**
1. Verificar `api/index.ts`
2. Verificar `vercel.json` routes
3. Verificar CORS settings

## 🔧 **Otimizações**

### **Performance**
- ✅ Code splitting configurado
- ✅ Static assets otimizados
- ✅ API routes otimizadas
- ✅ Caching configurado

### **Security**
- ✅ Headers de segurança
- ✅ CORS configurado
- ✅ Rate limiting (opcional)
- ✅ Input validation

## 📊 **Monitoramento Pós-Deploy**

### **Health Check**
```bash
# Testar API
curl https://your-app.vercel.app/api/health

# Testar Frontend
curl https://your-app.vercel.app
```

### **Performance**
- **First Load JS:** < 500KB
- **Lighthouse Score:** > 90
- **API Response Time:** < 200ms

## 🎯 **Próximos Passos**

1. ✅ Deploy inicial
2. 🔄 Configurar domínio customizado
3. 🔄 Configurar CI/CD
4. 🔄 Monitoramento avançado
5. 🔄 Backup automático

## 📞 **Suporte**

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Issues:** GitHub repository 