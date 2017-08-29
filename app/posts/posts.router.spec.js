const supertest = require('supertest'),
      proxyquire = require('proxyquire'),  
      expect = require('chai').expect,
      sinon = require('sinon'),
      express = require('express'),
      bodyParser = require('body-parser'),
      fakePost = require('./posts.faker'),
      Post = require('./posts.model').Post,
      Readable = require('stream').Readable;

require('sinon-as-promised');
require('sinon-mongoose');

function createResultsStream(array) {
  const rs = new Readable({objectMode: true});
  array.forEach(x => rs.push(x));
  rs.push(null);
  return rs;
}

describe('posts router', () => {
  let app, server, router, PostMock, request;
  beforeEach(() => {
    PostMock = sinon.mock(Post);
    app = express();
    router = proxyquire('./posts.router', { 
      '../utilities/authenticated': () => true
     });
    app.use(bodyParser.urlencoded({'extended':'true'}));
    app.use(bodyParser.json());
    app.use('/posts', router);
    server = app.listen(5000);
    request = supertest(app);
  });
  afterEach(() => {
    server.close();
  });
  it('should respond without queryParams', (done) => {
    const results = [];
    [1, 2, 3].forEach(() => results.push(fakePost()));
    stream = createResultsStream(results);
    PostMock.expects('find')
      .chain('limit').withArgs(10)
      .chain('skip').withArgs(0)
      .chain('sort').withArgs({ date: -1 })
      .chain('cursor')
      .returns(stream);
    request.get('/posts/')
      .expect(200, (err, res) => {
        PostMock.verify();
        PostMock.restore();
        expect(res.body).to.exist;
        expect(res.body.length).to.eq(3);
       done();
    });
  });
  it('should respond with queryParams', (done) => {
    const results = [ fakePost() ];
    stream = createResultsStream(results);
    PostMock.expects('find')
      .chain('limit').withArgs(1)
      .chain('skip').withArgs(1)
      .chain('sort').withArgs({ date: -1 })
      .chain('cursor')
      .returns(stream);
    request.get('/posts/')
      .query({ page: 2, perPage: 1 })
      .expect(200, (err, res) => {
        PostMock.verify();
        PostMock.restore();
        expect(res.body).to.exist;
        expect(res.body.length).to.eq(1);
       done();
    });
  });
  it('should respond to /:category', (done) => {
    const results = [ fakePost() ];
    stream = createResultsStream(results);
    PostMock.expects('find')
      .withArgs({categories: 'foo'})
      .chain('cursor')
      .returns(stream);
    request.get('/posts/foo')
      .expect(200, (err, res) => {
        PostMock.verify();
        PostMock.restore();
        expect(res.body).to.exist;
        expect(res.body.length).to.eq(1);
       done();
    });
  });
  it('should create', (done) => {
    const results = [ fakePost() ];
    PostMock.expects('create')
      .resolves(results);
    request.post('/posts/')
      .send({ post: fakePost() })
      .expect(200, (err, res) => {
        PostMock.verify();
        PostMock.restore();
        expect(res.body).to.exist;
       done();
    });
  });
  it('should delete', (done) => {
    const id = '123123';
    PostMock.expects('remove')
      .withArgs({ _id: id })
      .chain('exec')
      .resolves(true);
    request.delete('/posts/' + id )
      .expect(200, (err, res) => {
        PostMock.verify();
        PostMock.restore();
        expect(res.body).to.exist;
       done();
    });
  });
});
