# Paynoattn - API
A simple node-express-mongo app for my MEAN personal site.

# Getting Started
## 1. Setting up your environment
1. Make sure you have all the dependencies installed
  * [Node.js](https://nodejs.org/en/) (v6.9 or above)
  * Node dependies - run ```npm install``` in a shell in this project directory.
  * [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community)
2. Run the mongo executible in a shell (and leave it open) ```mongod```
3. Copy the ```env.js``` file from ```env.sample.js``` using ```cp env.sample.js env.js``` and change the 'mongoUser' and 'mongoPassword' values to your desired values.
4. Configure the port you wish to use your node app on. Default is 5000, and then you should use a proxy like [nginx] to route http/https traffic to your server. 
5. Run the user and roles script by opening a new shell and running ```mongo app/utilities/users-roles.js```

## 3. Seeding Data
Our app needs some data. Simply run ```npm run seed``` and it will seed our mongodb database with some data.

## 3. Restart mongo with port and in --auth mode
Close the previous instance of ```mongod``` using ```Ctrl+c```. Then change the value of ```mongoPort``` in the ```env.js``` file to a suggested port.
*Important* if in production do not use default port!!!
Run ```mongod --port $PORT_IN_ENV_FILE --auth```

## 3. Run the server
Run ```npm start``` and our app will run. Simply connect to 'localhost:5000' to begin to run your API calls.
### Development mode
Run ```npm run start:dev``` instead to get live updates to your express server as you write your code.
### Prod mode
Run ```npm run start:prod``` and your server will run on port 80 instead of 5000.
