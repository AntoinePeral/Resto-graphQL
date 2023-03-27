const CoreDatamapper = require('./coreDatamapper');
const client = require('../db/pg');

class City extends CoreDatamapper {
    tableName = 'city';
}

module.exports = new City(client);
