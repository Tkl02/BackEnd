export function authCron(req, res, next) {
    const cronSecret = process.env.CRON_SECRET;
    const { secret } = req.query;
    if (!cronSecret) {
        console.error('CRON_SECRET não esta configurado no .env');
        return res.status(500).json({ error: 'Configuração do servidor incompleta.' });
    }
    if (secret === cronSecret) {
        next();
    }
    else {
        return res.status(401).json({ error: 'Não autorizado' });
    }
}
//# sourceMappingURL=cron.middleware.js.map