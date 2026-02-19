import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 4001,
  mongoUri: process.env.MONGO_URI || '',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'change_me',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'change_me',
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  cookieDomain: process.env.COOKIE_DOMAIN || 'localhost'
};
