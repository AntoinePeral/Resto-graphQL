# Cache

Le cache est un système destiné a soulagé les opérations les plus gourmandes en ressources.

Le cache va se mettre positionné à la place du système de base et venir retourner des valeurs plus facilement.

Par exemple :

- dans le navigateur, il y a un système de cache pour éviter de demander en permanence les fichiers CSS, à la première récupération, il est enregistré en local sur notre machine
- dans l'appel à une API, enregistrer le résultat peut éviter d'avoir à effectuer plus d'appels que nécessaire à l'API
- dans une opération qui nécessite un gros travail en BDD, enregistrer le résultat en cache peut être une solution pour améliorer les performances

## Durée de vie

Par défaut, un cache a une durée limitée.

Une fois la durée passée, le cache est vidé.

Dans le cas où de nouvelles données seraient insérées, le cache ne serait pas bon, il va falloir le rafraichir.

Il y a deux notions à prendre en compte au niveau de la mise en place d'un cache :

- durée : il faut penser à un système qui va allonger celle-ci dans certains cas
- obsolescence : mettre la donnée à jour quotidiennement par exemple

