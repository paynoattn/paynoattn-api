const request = require('supertest'),
      expect = require('chai').expect;

describe('server', () => {
  let server;
  beforeEach(() => {
    server = require('./server'), { bustCache: true };
  });
  afterEach(() => {
    server.close();
  });
  it('responds to /', (done) => {
    request(server)
      .get('/')
      .expect(200, (err, res) => {
        const body = res.body;
        expect(body.status).to.exist;
        expect(new Date(body.upTime)).to.be.instanceof(Date);
        done();
      });
  });
  it('404 everything else', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});
