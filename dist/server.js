import { app } from "./app.js";
const PORT = process.env.PORT || 4000;
// Só inicia o servidor se não estiver rodando na Vercel (serverless)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em -> http://localhost:${PORT}`);
    });
}
// Exporta o app para a Vercel usar como serverless function
export default app;
//# sourceMappingURL=server.js.map