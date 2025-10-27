# Deploy na Vercel - Guia Completo

## ✅ Pré-requisitos Verificados

- [x] Build funciona corretamente
- [x] TypeScript configurado
- [x] Prisma configurado
- [x] Variáveis de ambiente documentadas
- [x] Server exportado para serverless

## 📋 Passos para Deploy

### 1. Preparar o Banco de Dados

Você precisa de um banco PostgreSQL em produção. Opções recomendadas:

- **Neon** (gratuito): https://neon.tech
- **Supabase** (gratuito): https://supabase.com
- **Railway**: https://railway.app
- **PlanetScale**: https://planetscale.com

### 2. Configurar Variáveis de Ambiente na Vercel

No dashboard da Vercel, adicione estas variáveis:

```
DATABASE_URL=sua-connection-string-aqui
JWT_ACCESS_SECRET=seu-secret-aqui
JWT_REFRESH_SECRET=seu-secret-aqui
CRON_SECRET=seu-cron-secret-aqui
NODE_ENV=production
PORT=9595
```

Se estiver usando Cloudinary:

```
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=seu-api-secret
```

### 3. Deploy via CLI (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy (primeira vez)
vercel

# Deploy em produção
vercel --prod
```

### 4. Deploy via GitHub

1. Faça push do seu código para o GitHub
2. Vá em https://vercel.com
3. Clique em "Import Project"
4. Selecione seu repositório
5. Configure as variáveis de ambiente
6. Clique em "Deploy"

### 5. Rodar Migrações do Prisma

Após o primeiro deploy, você precisa rodar as migrações:

**Opção A - Via Vercel CLI:**

```bash
vercel env pull .env.production
npx prisma migrate deploy
```

**Opção B - Adicionar no Build Command:**
No dashboard da Vercel, em Settings > General > Build & Development Settings:

Build Command:

```
prisma generate && prisma migrate deploy && tsc
```

## 🔧 Configurações Importantes

### Build Settings na Vercel

- **Framework Preset**: Other
- **Build Command**: `npm run build` (ou o comando com migrate acima)
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node Version**: 18.x ou superior

### Arquivos Importantes

- `vercel.json` - Configuração de rotas e builds
- `.env.example` - Template de variáveis de ambiente
- `.vercelignore` - Arquivos ignorados no deploy
- `tsconfig.json` - Configuração TypeScript

## 🚨 Problemas Comuns

### 1. Erro de Prisma Client

Se der erro "Cannot find module '@prisma/client'":

**Solução**: Certifique-se que `prisma generate` está no build command.

### 2. Timeout em Serverless Functions

Vercel tem limite de 10s (free) ou 60s (pro) para serverless functions.

**Solução**: Otimize queries do banco ou use Edge Functions.

### 3. Variáveis de Ambiente não carregam

**Solução**: Certifique-se que adicionou todas as variáveis no dashboard da Vercel.

### 4. Cookies não funcionam

**Solução**: Configure CORS e cookie settings:

```typescript
// Em app.ts, adicione:
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  next();
});
```

## 📊 Monitoramento

Após o deploy, monitore:

- Logs: https://vercel.com/[seu-projeto]/logs
- Analytics: https://vercel.com/[seu-projeto]/analytics
- Performance: https://vercel.com/[seu-projeto]/speed-insights

## 🔐 Segurança

Antes de ir para produção:

- [ ] Troque todos os secrets (JWT, CRON_SECRET)
- [ ] Configure CORS adequadamente
- [ ] Adicione rate limiting
- [ ] Configure HTTPS only para cookies
- [ ] Revise permissões do banco de dados

## 📚 Recursos Úteis

- Vercel Docs: https://vercel.com/docs
- Prisma on Vercel: https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel
- Node.js on Vercel: https://vercel.com/docs/functions/serverless-functions/runtimes/node-js

## ✅ Checklist Final

Antes de fazer o deploy em produção:

- [ ] Testei o build localmente (`npm run build`)
- [ ] Configurei todas as variáveis de ambiente
- [ ] Configurei o banco de dados em produção
- [ ] Rodei as migrações do Prisma
- [ ] Testei as rotas principais
- [ ] Configurei CORS se necessário
- [ ] Revisei os logs de erro
- [ ] Documentei a API (opcional mas recomendado)

## 🎯 Próximos Passos

Após o deploy bem-sucedido:

1. Configure um domínio customizado
2. Adicione monitoramento (Sentry, LogRocket)
3. Configure CI/CD para deploys automáticos
4. Adicione testes automatizados
5. Configure backup do banco de dados
