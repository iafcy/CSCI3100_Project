import app from './app';
import 'dotenv/config'

const PORT = process.env.API_PORT ? process.env.API_PORT : 8080;

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});