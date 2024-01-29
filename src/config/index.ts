import dotenv from 'dotenv';

dotenv.config();

const env = process.env;

export default {
    port: Number(env.PORT) || 3000,
    environment: env.NODE_ENV || "development",
    domain: {
      url: env.DOMAIN_URL || `http://localhost:${Number(env.PORT) || 3000}`,
    },
    fs: {
      bucket: 'file_repository',
      /**
       * @note when changing route change url's end route as well to match ;)
       */
      route: '/fs',
      url: `${env.DOMAIN_URL || `http://localhost:${Number(env.PORT) || 3000}`}/fs`
    },
    token: {
      iss: 'StudentLearningltm'
    },
    redirects: {
      confirmation: {
        success: { 
          url: env.CONFIRMATION_SUCCESS_URL || `http://localhost:4000/success`
        },
        fail: {
          url: env.CONFIRMATION_FAIL_URL || `http://localhost:4000/fail`
        }
      }
    },
    nodemailer: {
      service: env.NODEMAILER_SERVICE,
      host: env.NODEMAILER_HOST,
      port: env.NODEMAILER_PORT || 587,
      auth: {
        user: env.NODEMAILER_USER,
        password: env.NODEMAILER_PASS
      }
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
    contact: {
      email: {
        support: `support@yourcompany.com`
      }
    }
}