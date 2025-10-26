import { app } from "./app.js"

const PORT = process.env.PORT || 4000

const server = app.listen(PORT, () => {
    console.log(`servidor rodando no -> http://localhost:${PORT}`)
})

process.on('SIGINT', () => {
    console.log('Shutting down...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});