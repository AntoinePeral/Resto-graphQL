const CoreDatamapper = require('./coreDatamapper');
const client = require('../db/pg');

class Manager extends CoreDatamapper {
    tableName = 'manager';
}

module.exports = Manager;
