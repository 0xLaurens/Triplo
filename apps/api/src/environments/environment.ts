// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const environment = {
  production: false,
  MONGO_URL: process.env.MONGO_URL
};
