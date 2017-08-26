const faker = require('faker'),
      randomArray = require('../utilities/functions').randomArray,
      postModel = require('./posts.model'),
      categories = postModel.categories,
      sources = postModel.sources;

function random(array) {
  return array
}

module.exports = () => ({
  title: faker.lorem.sentence(),
  categories: [randomArray(categories)],
  imageURL: faker.image.imageUrl(),
  source: randomArray(sources),
  link: faker.internet.url(),
  preview: `<p>${faker.lorem.paragraph()}</p>`,
  date: new Date()
});
