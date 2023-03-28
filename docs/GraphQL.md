# GraphQL

GraphQL nous permet de mettre en place facilement une API.

Cette API devra être requêtée au travers de requêtes de type GraphQL.

A la base créée en interne, cette façon de mettre en place des API est de plus en plus commune.

La mise en place de la structure est ce qui est le plus compliqué, après tout est automatisé.

La mise en place comprend :

- la définition des Types (schéma)
- la définition des resolvers

## Schéma

Le schéma GraphQL est l'ensemble des types définis pour être utilisés dans l'API.

Les Types sont à l'image des tables en BDD.

Les types primitifs permettent de venir définir des types Custom qui pourront être repris dans d'autres types (dans le cas des clefs étrangères)

### Type custom

Il est possible d'étendre un type ou de créer un type de scalaire afin d'afiner la validation des données qu'elles soient entrantes ou sortantes.

## Resolver

Les resolvers à l'image des controllers vont nous permettre de faire un lien entre un Type et la donnée qui lui est associée.

Un resolver d'un Type va notamment mettre à disposition les méthodes qui permettent de venir chercher les enfants.

Les méthodes des resolvers ont plusieurs paramètres :

- le parent (l'objet qui essaie de résoudre quelque chose)
- les arguments (les arguments transmis via la requête), c'est ce qu'on retrouvait avant via req.params,req.query ou req.body
- le contexte actuel de la requête, il peut contenir différentes informations telles que les sources de données (datasource), les informations de l'utilisateur courant
- les informations de l'état des opérations, les données de paramétrage

## Datasource

GraphQL nous permet de transmettre l'accès aux données via le contexte.

Les données peuvent aussi bien être dans une BDD ou provenant d'une API Externe.

Par défaut, GraphQL n'optimise rien.

Il est possible de faire évoluer le système en mettant en place un système de cache (il y en a déjà un interne dans Apollo avec les RESTDataSource) et un système d'optimisation des requêtes via Knex.


