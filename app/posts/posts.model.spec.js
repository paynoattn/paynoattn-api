const expect = require('chai').expect,
  Post = require('./posts.model'),
  fakePost = require('./posts.faker');


describe('Post validations', () => {
  it('should have a valid factory', (done) => {
    const postFake = fakePost(),
          testingPost = new Post(postFake);
    testingPost.validate(err => {
      expect(err).to.be.null;
      done();
    });
  });
  it('should have required fields', (done) => {
    const testingPost = new Post({});
    testingPost.validate(err => {
      const errors = err.errors;
      expect(errors.title).to.exist;
      expect(errors.source).to.exist;
      expect(errors.title).to.exist;
      expect(errors.categories).to.exist;
      done();
    });
  });
  it('should be invalid without a correct category', (done) => {
    const postFake = fakePost();
    postFake.categories = ['foobar'];
    const testingPost = new Post(postFake);
    testingPost.validate(err => {
      const errors = err.errors;
      expect(errors.categories).to.exist;
      done();
    });
  });
  it('should be invalid without a matching source', (done) => {
    const postFake = fakePost();
    postFake.source = ['foobar'];
    const testingPost = new Post(postFake);
    testingPost.validate(err => {
      const errors = err.errors;
      expect(errors.source).to.exist;
      done();
    });
  });
});
