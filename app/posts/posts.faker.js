const faker = require('faker'),
      randomArray = require('../utilities/functions').randomArray;

const categories = [
  'development', 'design', 'writing', 'blog'
];

const sources = [
  'facebook', 'twitter', 'medium', 'wordpress', 'behance'
];

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
