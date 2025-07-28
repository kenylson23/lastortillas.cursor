# 🚀 Deploy no Vercel - Las Tortillas

## 📋 Checklist de Deploy

### ✅ Pré-requisitos
- [x] Conta no Vercel
- [x] Repositório conectado ao GitHub
- [x] Variáveis de ambiente configuradas

### 🔧 Configuração

#### 1. Variáveis de Ambiente no Vercel
Configure as seguintes variáveis no painel do Vercel:

```bash
JWT_SECRET=lasTortillas2025-secret-key
SUPABASE_URL=https://nuoblhgwtxyrafbyxjkw.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51b2JsaGd3dHh5cmFmYnl4amt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4ODEwMDUsImV4cCI6MjA2NjQ1NzAwNX0.vn95TruJXJRytI30P5xhBMUwc2ECJe4ulJ1xdLw6I6U
NODE_ENV=production
```

#### 2. Comandos de Deploy

```bash
# Deploy para produção
vercel --prod

# Deploy para preview
vercel

# Ver logs
vercel logs --prod
```

### 🎯 Endpoints Disponíveis

#### Autenticação
- `POST /api/auth/login` - Login de usuários
- `POST /api/auth/verify` - Verificar token JWT
- `POST /api/auth/refresh` - Renovar token JWT

#### Restaurante
- `GET /api/menu-items` - Listar itens do menu
- `GET /api/orders` - Listar pedidos
- `POST /api/orders` - Criar novo pedido
- `GET /api/tables` - Listar mesas

#### Teste
- `GET /api/hello` - Endpoint de teste
- `GET /api/test-auth` - Teste de autenticação

### 🔐 Credenciais de Acesso

#### Administrador
- **Usuário:** `administrador`
- **Senha:** `lasTortillas2025!`

#### Cozinha
- **Usuário:** `cozinha`
- **Senha:** `lasTortillas2025Cozinha!`

### 📊 Monitoramento

#### Logs
```bash
# Ver logs em tempo real
vercel logs --follow

# Ver logs de um deployment específico
vercel logs <deployment-id>
```

#### Métricas
- Acesse o painel do Vercel para ver métricas de performance
- Monitore erros e tempo de resposta

### 🛠️ Troubleshooting

#### Problema: 404 em endpoints
**Solução:** Verificar se `vercel.json` está configurado corretamente

#### Problema: Erro de CORS
**Solução:** Verificar se headers CORS estão configurados nos endpoints

#### Problema: Erro de autenticação
**Solução:** Verificar se `JWT_SECRET` está configurado no Vercel

### 📈 Performance

- **Bundle Size:** ~0.83MB (otimizado)
- **Build Time:** ~30-60 segundos
- **Cold Start:** ~200-500ms

### 🔒 Segurança

- ✅ JWT implementado
- ✅ CORS configurado
- ✅ Variáveis de ambiente seguras
- ✅ Validação de entrada

### 📞 Suporte

Para problemas técnicos:
1. Verificar logs no Vercel
2. Testar endpoints localmente
3. Verificar configuração de variáveis de ambiente

---

**Status:** ✅ Pronto para Deploy
**Última Atualização:** $(date) 