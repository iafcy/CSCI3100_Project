import winston from 'winston';
import 'dotenv/config'

const { printf, combine, timestamp, errors, colorize } = winston.format;

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        colorize({ all: true }),
        timestamp(),
        errors({ stack: true }),
        printf(({ timestamp, level, message, stack }) => {
            return `${timestamp} [${level}]: ${stack || message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
    ],
});

export default logger;