# 🔧 Troubleshooting - Deploy Vercel

## 🚨 **Problemas Comuns e Soluções**

### **1. Erro: "Cannot connect to server"**

#### **Causas Possíveis:**
- Configuração incorreta do `vercel.json`
- Falta de entry point para Vercel Functions
- Variáveis de ambiente não configuradas
- Problemas de CORS

#### **Soluções:**

**A. Verificar Configuração do Vercel:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/public"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/index.ts"
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

**B. Verificar Variáveis de Ambiente no Vercel:**
```env
DATABASE_URL=postgresql://postgres.nuoblhgwtxyrafbyxjkw:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
SUPABASE_URL=https://nuoblhgwtxyrafbyxjkw.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NODE_ENV=production
VERCEL=true
CORS_ORIGIN=https://your-app.vercel.app
```

### **2. Erro: "Build Failed"**

#### **Causas:**
- Dependências não instaladas
- Erros de TypeScript
- Problemas de importação

#### **Soluções:**

**A. Verificar Build Local:**
```bash
npm install
npm run build
```

**B. Verificar TypeScript:**
```bash
npm run check
```

**C. Limpar Cache:**
```bash
rm -rf node_modules
rm -rf dist
npm install
```

### **3. Erro: "Database Connection Failed"**

#### **Causas:**
- DATABASE_URL incorreta
- Problemas de SSL
- Firewall do Supabase

#### **Soluções:**

**A. Verificar Connection String:**
```env
DATABASE_URL=postgresql://postgres.nuoblhgwtxyrafbyxjkw:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**B. Testar Conexão:**
```bash
# Testar no Supabase Dashboard
# Settings > Database > Connection string
```

### **4. Erro: "API Routes Not Found"**

#### **Causas:**
- Rotas não configuradas corretamente
- Problemas de importação

#### **Soluções:**

**A. Verificar api/index.ts:**
```typescript
import app from '../server/index';
export default app;
```

**B. Testar Endpoints:**
```bash
# Health check
curl https://your-app.vercel.app/api/health

# Test API
curl https://your-app.vercel.app/api/hello
```

## 🔍 **Diagnóstico Passo a Passo**

### **1. Verificar Logs do Vercel:**
```bash
vercel logs --follow
vercel logs --prod
```

### **2. Testar Build Local:**
```bash
npm run build
npm run start
```

### **3. Verificar Variáveis de Ambiente:**
```bash
# No Vercel Dashboard
# Settings > Environment Variables
```

### **4. Testar Conexão com Supabase:**
```bash
# Testar no Supabase Dashboard
# SQL Editor > Test query
```

## 🛠️ **Comandos de Debug**

### **Verificar Status do Deploy:**
```bash
vercel ls
vercel inspect your-app
```

### **Redeploy:**
```bash
vercel --prod --force
```

### **Verificar Build:**
```bash
vercel build
```

## 📊 **Monitoramento**

### **Health Check Endpoints:**
- `https://your-app.vercel.app/api/health`
- `https://your-app.vercel.app/api/hello`

### **Métricas Importantes:**
- Response Time: < 200ms
- Error Rate: < 1%
- Uptime: > 99.9%

## 🚀 **Deploy Limpo**

### **1. Limpar Cache:**
```bash
rm -rf .vercel
rm -rf dist
rm -rf node_modules
```

### **2. Reinstalar Dependências:**
```bash
npm install
```

### **3. Build e Deploy:**
```bash
npm run build
vercel --prod
```

## 📞 **Suporte**

### **Logs Úteis:**
- Vercel Function Logs
- Build Logs
- Runtime Logs

### **Contatos:**
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Supabase Support: [supabase.com/support](https://supabase.com/support)

## ✅ **Checklist de Verificação**

- [ ] `vercel.json` configurado corretamente
- [ ] `api/index.ts` existe e exporta o app
- [ ] Variáveis de ambiente configuradas no Vercel
- [ ] Build local funciona
- [ ] Conexão com Supabase testada
- [ ] CORS configurado corretamente
- [ ] Health check endpoint responde
- [ ] Logs sem erros críticos 