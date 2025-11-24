import { app } from "./app.js";

const PORT = process.env.PORT || 4000;

// Para desenvolvimento local (não serverless)
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em -> http://localhost:${PORT}`);
    });
}

// Export default para Vercel (serverless)
export default app;
