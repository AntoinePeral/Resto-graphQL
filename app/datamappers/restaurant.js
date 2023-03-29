const DataLoader = require('dataloader');
const CoreDatamapper = require('./coreDatamapper');

class Restaurant extends CoreDatamapper {
    tableName = 'restaurant';

    createLoaders() {
        // On créer les loaders de base
        super.createLoaders();

        // Puis ceux spécifiques au datamapper courant
        // ! attention de ne pas utiliser les même que dans le coreDatamapper
        this.managerIdLoader = new DataLoader(async (ids) => {
            const intIds = ids.map((id) => parseInt(id, 10));
            const records = await this.findByManager(intIds);

            /*
            Attention ici on ne doit pas utilisé un find, mais un filter,
            car il peut y avoir plusieurs catégories
            */
            return intIds.map((id) => records.filter((record) => record.manager_id === id));
        });

        this.cityIdLoader = new DataLoader(async (ids) => {
            const intIds = ids.map((id) => parseInt(id, 10));
            const records = await this.findByCity(intIds);

            /*
            Attention ici on ne doit pas utilisé un find, mais un filter,
            car il peut y avoir plusieurs catégories
            */
            return intIds.map((id) => records.filter((record) => record.city_id === id));
        });
    }

    async findByManager(managerId) {
        const bulk = Array.isArray(managerId);

        if (!bulk && process.env.DATALOADER_ENABLED) {
            return this.managerIdLoader.load(managerId);
        }

        const query = this.knex(this.tableName)
            .select('*');

        if (bulk) {
            query.whereIn('manager_id', managerId);
        } else {
            query.where('manager_id', managerId);
        }

        const result = await (process.env.CACHE_ENABLED ? query.cache(this.TTL) : query);
        return result;
    }

    async findByCity(cityId) {
        const bulk = Array.isArray(cityId);

        if (!bulk && process.env.DATALOADER_ENABLED) {
            return this.cityIdLoader.load(cityId);
        }

        const query = this.knex(this.tableName)
            .select('*');

        if (bulk) {
            query.whereIn('city_id', cityId);
        } else {
            query.where('city_id', cityId);
        }

        const result = await (process.env.CACHE_ENABLED ? query.cache(this.TTL) : query);
        return result;
    }
}

module.exports = Restaurant;
