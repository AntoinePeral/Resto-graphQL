const { SQLDataSource } = require('datasource-sql');

const RestaurantDatamapper = require('../datamappers/restaurant');
const ManagerDatamapper = require('../datamappers/manager');
const CityDatamapper = require('../datamappers/city');
const CookingStyleDatamapper = require('../datamappers/cookingStyle');

class RestoDB extends SQLDataSource {
    constructor(config) {
        super(config);
        this.restaurant = new RestaurantDatamapper(this.knex);
        this.manager = new ManagerDatamapper(this.knex);
        this.city = new CityDatamapper(this.knex);
        this.cookingStyle = new CookingStyleDatamapper(this.knex);
    }

    createLoaders() {
        this.restaurant.createLoaders();
        this.manager.createLoaders();
        this.city.createLoaders();
        this.cookingStyle.createLoaders();
    }
}

module.exports = RestoDB;
