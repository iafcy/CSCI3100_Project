import app from './app';
import logger from './utils/logger';
import 'dotenv/config'

const PORT = process.env.API_PORT ? process.env.API_PORT : 8080;

app.listen(PORT, () => {
    logger.info(`Server running at port ${PORT}`);
});