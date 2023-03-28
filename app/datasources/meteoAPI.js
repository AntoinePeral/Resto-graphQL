const debug = require("debug")("API:meteo");

const { RESTDataSource } = require('@apollo/datasource-rest');
const client = require('../db/redis');
const cityDatamapper = require("../datamappers/city");

class meteoAPI extends RESTDataSource {

    baseURL = 'https://api.open-meteo.com/v1/';

    async getMeteoByGeopos(latitude, longitude) {

        // ma clef est `${latitude}&${longitude}`
        const key = `${latitude}&${longitude}`;
        const value = await client.get(key);
        debug(value);
        // 1. je vérifie la valeur est en cache ?
        if (!value) {
            // 1.1 je récupère la donnée pour la mettre en cache
            const response = await this.get("forecast", {
                params: {
                    latitude,
                    longitude,
                    current_weather: true,
                    hourly: "temperature_2m"
                }
            });

            // enregistrement dans le cache
            await client.set(key, response.current_weather.temperature);

        }

        // 2. si oui je retourne la valeur
        return {
            temperature: value
        };
    }

    /**
     * Mise à jour des valeurs du cache
     */
    static async updateMeteo() {
        // je récupère l'ensemble de villes
        const cities = await cityDatamapper.findAll();
        const baseURL = 'https://api.open-meteo.com/v1/';

        console.log("lancement des appels à la météo !");
        // je boucle sur les villes
        for (const city of cities) {
            try {
                // je lance l'appelle "fetch" pour une ville (suivant sa geopos)
                const response = await fetch(`${baseURL}forecast?latitude=${city.geopos.x}&longitude=${city.geopos.y}&current_weather=true&hourly=temperature_2m`);

                // je récupère la météo pour la ville
                const result = await response.json();
                // console.log(result);

                // je définis la clef du cache
                const key = `${city.geopos.x}&${city.geopos.y}`;

                // j'enregistre dans le cache la valeur de la température
                await client.set(key, result.current_weather.temperature);
            }
            catch (error) {
                console.log(city.name,error);
            }
        }
    }

}

module.exports = meteoAPI;
