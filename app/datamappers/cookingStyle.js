const DataLoader = require('dataloader');
const CoreDatamapper = require('./coreDatamapper');

class CookingStyle extends CoreDatamapper {
    tableName = 'cooking_style';

    createLoaders() {
        // On créer les loaders de base
        super.createLoaders();

        // Puis ceux spécifiques au datamapper courant
        // ! attention de ne pas utiliser les même que dans le coreDatamapper
        this.restaurantIdLoader = new DataLoader(async (ids) => {
            const intIds = ids.map((id) => parseInt(id, 10));
            const records = await this.findByRestaurant(intIds);
            /*
            Attention ici on ne doit pas utilisé un find, mais un filter,
            car il peut y avoir plusieurs catégories
            */
            return intIds.map((id) => records.filter((record) => record.restaurant_id === id));
        });
    }

    async findByRestaurant(restaurantId) {
        const bulk = Array.isArray(restaurantId);

        if (!bulk && process.env.DATALOADER_ENABLED) {
            return this.restaurantIdLoader.load(restaurantId);
        }

        const query = this.knex(this.tableName)
            .select('*')
            .join('restaurant_has_cooking_style', 'restaurant_has_cooking_style.cooking_style_id', '=', 'cooking_style.id');

        if (bulk) {
            query.whereIn('restaurant_id', restaurantId);
        } else {
            query.where('restaurant_id', restaurantId);
        }

        const result = await (process.env.CACHE_ENABLED ? query.cache(this.TTL) : query);
        return result;
    }
}

module.exports = CookingStyle;
