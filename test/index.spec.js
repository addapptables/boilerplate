process.env.TS_NODE_PROJECT = './test/tsconfig.spec.json'
process.env.TS_CONFIG_PATHS = true;
require('dotenv-safe').config({
  allowEmptyValues: true,
  path: './test/.env.test',
  sample: './test/.env.test',
});
require('ts-mocha');
