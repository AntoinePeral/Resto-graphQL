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

## Resolver

Les resolvers à l'image des controllers vont nous permettre de faire un lien entre un Type et la donnée qui lui est associée.

Un resolver d'un Type va notamment mettre à disposition les méthodes qui permettent de venir chercher les enfants.

Les méthodes des resolvers ont plusieurs paramètres :

- le parent (l'objet qui essaie de résoudre quelque chose)
