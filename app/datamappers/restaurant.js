const CoreDatamapper = require('./coreDatamapper');
const client = require('../db/pg');

class Restaurant extends CoreDatamapper {
    tableName = 'restaurant';

    async findByManager(managerId) {
        const preparedQuery = {
            text: `
                SELECT *
                FROM "${this.tableName}"
                WHERE "manager_id" = $1`,
            values: [managerId],
        };

        const result = await this.client.query(preparedQuery);

        return result.rows;
    }

    async findByCity(cityId) {
        const preparedQuery = {
            text: `
                SELECT *
                FROM "${this.tableName}"
                WHERE "city_id" = $1`,
            values: [cityId],
        };

        const result = await this.client.query(preparedQuery);

        return result.rows;
    }
}

module.exports = new Restaurant(client);
