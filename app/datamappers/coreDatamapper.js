const DataLoader = require('dataloader');

class CoreDatamapper {
    tableName;

    idLoader;

    TTL = 20;

    constructor(knex) {
        this.knex = knex;
    }

    createLoaders() {
        this.idLoader = new DataLoader(async (ids) => {
            const intIds = ids.map((id) => parseInt(id, 10));
            /*
            On appelle donc la méthode qui permet de récupérer
            un ensemble de catégories via leurs ids
            */
            const records = await this.findByPk(intIds);

            /*
            Il est indispensable de retourner les id dans le même ordre que que ce qui nous est
            passé en paramètre Les fonctions SQL IN / ANY ne nous garantissent pas le même ordre que
            ce qui est passé en requête On utilise donc la fonction map sur le tableau d'entrée pour
            réordonner les objets récupérés
            */
            return intIds.map((id) => records.find((record) => record.id === id));
        });
    }

    /**
     * Récupération par identifiant
     * @param {number|number[]} id identifiant ou liste d'identifiants
     * @returns un enregistrement ou une liste d'enregistrement
     */
    async findByPk(id) {
        const bulk = Array.isArray(id);

        if (!bulk && process.env.DATALOADER_ENABLED) {
            /*
            Ici plutôt que de faire la requête directement
            On passe l'id au DataLoader qui va le stocker
            Et décharger toute la liste d'id au moment approprié
            et redistribuer à chaque appelant les données demandées.
            */
            return this.idLoader.load(id);
        }

        const query = this.knex(this.tableName)
            .select('*');

        if (bulk) {
            query.whereIn('id', id);
        } else {
            query.where('id', id);
        }

        const result = await (process.env.CACHE_ENABLED ? query.cache(this.TTL) : query);

        if (bulk) {
            return result;
        }

        return result[0];
    }

    async findAll(params) {
        const query = this.knex(this.tableName)
            .select('*');
        if (params?.$where) {
            Object.entries(params.$where).forEach(([param, value]) => {
                if (param === '$or') {
                    query.where((builder) => {
                        Object.entries(value).forEach(([key, val]) => {
                            builder.orWhere(key, val);
                        });
                    });
                } else {
                    query.where(param, value);
                }
            });
        }

        if (params?.offset) query.offset(params.offset);
        if (params?.limit) query.limit(params.limit);

        //! Attention : la méthode cache() implémenté par sql-datasource et non Knex execute la
        //! requête. donc ici il faut retourner le résultat directement
        const result = await (process.env.CACHE_ENABLED ? query.cache(this.TTL) : query);
        return result;
    }

    async create(data) {
        const result = await this.knex(this.tableName)
            .insert(data)
            .returning('*');
        return result[0];
    }

    async update({ id }, inputData) {
        const result = await this.knex(this.tableName)
            .where({ id })
            .update({ ...inputData, updated_at: new Date() })
            .returning('*');
        return result;
    }

    async delete(id) {
        const result = await this.knex(this.tableName)
            .where({ id })
            .delete();
        return result;
    }
}

module.exports = CoreDatamapper;
