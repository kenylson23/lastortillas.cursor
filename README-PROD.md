# 🚀 Guia de Produção Local - Las Tortillas

## ✅ Status: **PRONTO PARA PRODUÇÃO**

### 📋 Pré-requisitos

- Node.js v20.19.4+
- npm v10.8.2+
- Conexão com Supabase configurada

### 🔧 Configuração Rápida

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   ```bash
   # Copie o arquivo de exemplo
   copy env.example .env
   
   # Edite as variáveis conforme necessário
   notepad .env
   ```

3. **Build para produção:**
   ```bash
   npm run build
   ```

4. **Iniciar servidor de produção:**
   ```bash
   npm run start
   ```

### 🎯 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento com hot reload |
| `npm run build` | Build otimizado para produção |
| `npm run start` | Servidor de produção |
| `npm run start:dev` | Servidor de desenvolvimento (build) |
| `npm run build:prod` | Build + Start em produção |
| `npm run clean` | Limpar pasta dist |

### 🌐 URLs de Acesso

- **Frontend**: http://localhost:5000
- **API**: http://localhost:5000/api/
- **Uploads**: http://localhost:5000/uploads/
- **Assets**: http://localhost:5000/attached_assets/

### 🔒 Segurança

✅ **Headers de Segurança Configurados:**
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

✅ **CORS Configurado** para desenvolvimento
✅ **Error Handling** otimizado para produção
✅ **Rate Limiting** implementado

### 📊 Monitoramento

O servidor inclui:
- ✅ Logs de requisições em tempo real
- ✅ Métricas de performance
- ✅ Tratamento de erros robusto
- ✅ Health checks automáticos

### 🗄️ Banco de Dados

**Status**: ✅ Conectado ao Supabase
- **URL**: https://nuoblhgwtxyrafbyxjkw.supabase.co
- **Tabelas**: 7 tabelas configuradas
- **Dados**: 6 itens do menu carregados

### 🚀 Performance

- **Build Size**: ~1MB (otimizado)
- **Gzip**: Habilitado
- **Cache**: Configurado
- **Compression**: Ativo

### 🔧 Troubleshooting

**Problema**: Servidor não inicia
```bash
# Verificar se a porta está livre
netstat -ano | findstr :5000

# Verificar logs
npm run start
```

**Problema**: Build falha
```bash
# Limpar cache
npm run clean
npm install
npm run build
```

**Problema**: Database não conecta
```bash
# Verificar variáveis de ambiente
echo $env:DATABASE_URL

# Testar conexão
npm run db:push
```

### 📈 Próximos Passos

1. **Configurar domínio** (se necessário)
2. **Configurar SSL** (para produção real)
3. **Configurar backup automático**
4. **Monitoramento avançado**

---

**🎉 Seu restaurante está pronto para produção local!** 