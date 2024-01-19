import dotenv from 'dotenv';

dotenv.config();

const env = process.env;

export default {
    port: Number(env.PORT) || 3000,
    environment: env.NODE_ENV || "development",
    domain: {
      url: env.DOMAIN_URL || `http://localhost:${Number(env.PORT) || 3000}`
    },
    token: {
      iss: 'StudentLearningltm'
    },
    database: {
        development: {
          uri: env.MONGO_DB_DEV_URI || env.MONGO_DB_URI || "",
          name: env.MONGO_DB_DEV_NAME || env.MONGO_DB_NAME,
          password: env.MONGO_DB_DEV_PASS || env.MONGO_DB_PASS,
          user: env.MONGO_DB_DEV_USER || env.MONGO_DB_USER
        },
        production: {
          uri: env.MONGO_DB_URI || "",
          name: env.MONGO_DB_NAME,
          password: env.MONGO_DB_PASS,
          user: env.MONGO_DB_USER
        },
        test: {
          uri: env.TEST_MONGO_DB_URI || "",
          name: env.TEST_MONGO_DB_NAME,
          password: env.TEST_MONGO_DB_PASS,
          user: env.TEST_MONGO_DB_USER
        }
    },
}