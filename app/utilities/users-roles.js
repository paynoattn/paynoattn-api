// get user and password from env file
load('./env.js');
var userName = module.exports.mongoUser;
var password = module.exports.mongoPassword;

// connect to mongo db
connection = new Mongo();
db = connection.getDB('paynoattn');

// drop role and user if it already exists
db.dropRole("app");
db.dropUser(userName);

// create role
db.createRole({
  role: "app",
  privileges: [
    {  resource: { db: "paynoattn", collection: "" }, actions: [ "find", "update", "insert", "remove" ] }
  ],
  roles: []
});

// create user
db.createUser({
  user: userName, 
  pwd: password,
  roles: [ "app" ]
});
