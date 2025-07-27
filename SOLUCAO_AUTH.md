# 🔐 Guia de Solução de Problemas - Autenticação Las Tortillas

## **🚨 Problema Identificado**

O sistema de autenticação está apresentando erros de conexão devido a uma **configuração mista** entre dois sistemas:

1. **Sistema Customizado** (hardcoded)
2. **Sistema Supabase Auth**

---

## **🔧 Soluções Implementadas**

### **1. Sistema Customizado (Recomendado para Desenvolvimento)**

**Credenciais:**
- **Usuário:** `administrador`
- **Senha:** `lasTortillas2025!`

**Arquivo:** `api/auth/login.ts` ✅ **Corrigido**

### **2. Sistema Supabase Auth (Para Produção)**

**Credenciais:**
- **Email:** `admin@lastortillas.com`
- **Senha:** `admin123` (se configurado)

**Arquivo:** `api/auth/login-supabase.ts` ✅ **Criado**

---

## **🧪 Como Testar**

### **Opção 1: Página de Teste**
1. Abra `test-auth.html` no navegador
2. Teste ambos os sistemas de autenticação
3. Verifique os resultados em tempo real

### **Opção 2: Teste Manual**
```bash
# Teste Sistema Customizado
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"administrador","password":"lasTortillas2025!"}'

# Teste Sistema Supabase
curl -X POST http://localhost:5000/api/auth/login-supabase \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lastortillas.com","password":"admin123"}'
```

---

## **⚙️ Configuração de Ambiente**

### **Variáveis Necessárias:**

```env
# Supabase Configuration
SUPABASE_URL=https://nuoblhgwtxyrafbyxjkw.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51b2JsaGd3dHh5cmFmYnl4amt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4ODEwMDUsImV4cCI6MjA2NjQ1NzAwNX0.vn95TruJXJRytI30P5xhBMUwc2ECJe4ulJ1xdLw6I6U

# Database Configuration
DATABASE_URL=postgresql://postgres.nuoblhgwtxyrafbyxjkw:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres

# Server Configuration
PORT=5000
NODE_ENV=development
```

---

## **🔍 Diagnóstico de Problemas**

### **Erro: "Erro de conexão"**

**Possíveis Causas:**
1. **Servidor não está rodando**
2. **Variáveis de ambiente não configuradas**
3. **CORS não configurado**
4. **Porta incorreta**

**Soluções:**
```bash
# 1. Verificar se o servidor está rodando
npm run dev

# 2. Verificar variáveis de ambiente
echo $SUPABASE_URL
echo $SUPABASE_ANON_KEY

# 3. Verificar logs do servidor
# Procure por erros no console
```

### **Erro: "Credenciais inválidas"**

**Possíveis Causas:**
1. **Credenciais incorretas**
2. **Sistema de autenticação errado**
3. **Banco de dados não acessível**

**Soluções:**
1. **Use as credenciais corretas:**
   - Customizado: `administrador` / `lasTortillas2025!`
   - Supabase: `admin@lastortillas.com` / `admin123`

2. **Verifique qual sistema está sendo usado**

### **Erro: "Method not allowed"**

**Causa:** Requisição não está sendo feita via POST

**Solução:** Verifique se está usando o método POST correto

---

## **🚀 Deploy no Vercel**

### **1. Configurar Variáveis no Vercel:**
- Acesse o dashboard do Vercel
- Vá em Project Settings > Environment Variables
- Adicione todas as variáveis do arquivo `env.vercel.example`

### **2. Verificar Build:**
```bash
# Teste local antes do deploy
npm run build
npm run start
```

### **3. Testar após Deploy:**
- Use a página `test-auth.html` no domínio do Vercel
- Verifique os logs no dashboard do Vercel

---

## **📋 Checklist de Verificação**

- [ ] Servidor rodando em `http://localhost:5000`
- [ ] Variáveis de ambiente configuradas
- [ ] API `/api/auth/login` respondendo
- [ ] API `/api/auth/login-supabase` respondendo
- [ ] Credenciais corretas sendo usadas
- [ ] CORS configurado corretamente
- [ ] Logs do servidor sem erros

---

## **🆘 Suporte**

Se o problema persistir:

1. **Verifique os logs do servidor**
2. **Teste com a página `test-auth.html`**
3. **Confirme as variáveis de ambiente**
4. **Verifique a conectividade com o Supabase**

---

## **📝 Notas Importantes**

- **Desenvolvimento:** Use o sistema customizado para testes rápidos
- **Produção:** Use o sistema Supabase Auth para segurança
- **Sempre teste ambos os sistemas** antes de fazer deploy
- **Mantenha as credenciais seguras** e não as exponha no código 