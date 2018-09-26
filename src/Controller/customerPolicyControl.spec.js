const assert = require('assert');
const request = require('supertest');

describe('Get Customer', () => {
  let server;
  beforeEach(() => {
    server = require('../../index');
  });
  afterEach(() => {
    server.close();
  });

  it('responds to /', (done) => {
    request(server)
      .get('/')
      .expect('hello', done);
  });
});
