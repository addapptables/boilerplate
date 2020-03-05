require('dotenv-safe').config({
  allowEmptyValues: true,
  path: './test/.env.test',
  sample: './test/.env.test',
});
require("tsconfig-paths/register");

// When path registration is no longer needed
// cleanup();

const chai = require('chai')
  .use(require('chai-as-promised'));

// Chai
global.chai = chai;
global.expect = chai.expect;
global.should = chai.should;
// global.Promise = Promise;

should();
