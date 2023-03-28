const { RESTDataSource } = require('@apollo/datasource-rest');


class kaamelottAPI extends RESTDataSource {
    //https://kaamelott.chaudie.re/api/random
    // {
    //     "status": 1,
    //     "citation": {
    //         "citation": "C'est vexant de me ressembler ? C'est pour \u00e7a qu'on vous a choisi et qu'on vous a sorti de votre cambrousse, alors du respect ! ",
    //         "infos": {
    //             "auteur": "Alexandre Astier",
    //             "acteur": "Caroline Pascal",
    //             "personnage": "Demetra",
    //             "saison": "Livre III",
    //             "episode": "Les Cheveux Noirs"
    //         }
    //     }
    // }
    baseURL = 'https://kaamelott.chaudie.re/api/';

    async getCitation() {
        const response = await this.get(`random`);

        return {
            personnage:response.citation.infos.personnage,
            text:response.citation.citation
        };
    }

}

module.exports = kaamelottAPI;
