## Import / export

ES6 a aussi introduit une nouvelle fonctionnalité bien pratique pour implémenter le patron de conception "pattern module".

Le concept est assez simple : d'un côté on exporte des ressources depuis des modules, et de l'autre on importe ces ressources pour les utiliser.
Ceci présente l'avantage de pouvoir assez facilement gérer la distinction entre ce qui est "privé" et ce qui est "public" au sein d'un module.

### Les exports

Il existe deux types d'export : les exports **nommés** est les exports **par défaut**.

Il est possible d'utiliser les deux au sein d'un même module.

Les exports nommés sont des exports dont on a spécifié le nom. Lorsque l'on va importer ces ressources il faudra donc impérativement spécifier leur nom.

Voici quelques exemples d'exports nommés:

```javascript
export const ucfirst = word => word.charAt(0).toUpperCase() + string.slice(1);
```

```javascript
export const data = [{ code: 'FR', label: 'France' }, { code: 'BE', label: 'Belgique' }]; 
```

```javascript
const splitString = string => [...string];
export { splitString };    
```

Les exports par défaut ne possèdent pas de nom, on est libre d'attribuer celui que l'on souhaite à l'import :

```javascript
export default (val1, val2) => val1 + val2;
```

```javascript
export default class {
  /** ... */
} 
```

### Les imports

Vous vous en doutez il s'agit ici d'importer les ressources exportées depuis les modules.

PAr exemple voici comment importer la fonction ucfirst exportée depuis le premier exemple de la page :

```javascript
import { ucfirst } from './lib/strings'

console.log(ucfirst('youpi'));
```

Dans le cas d'un export par défaut :

```javascript
import Calcul from 'lib/calcul';

console.log(Calcul(1, 2)):
```

Pour éviter les conflits avec d'autres imports ou des éléments locaux, il est aussi possible de renommer les éléments importés :

```javascript
import { ucfirst as upperCaseFirst } from './lib/strings'
```

### Et vous ?

Si ce n'est pas déjà le cas c'est une façon de coder que vous devez absolument adopter.

---

## Exercice 7 :

<div role="alert" class="alert alert-info show">
    Dans un même module, exportez :
    <ul>
        <li>une fonction qui renvoie la date du jour localisée (export nommé)</li>
        <li>un objet quelconque (export nommé)</li>
        <li>un objet dont les clés <code>add</code> et <code>subtract</code> réalisent respectivement l'ajout et la soustraction des deux opérandes qu'elles reçoivent (export par défaut)</li>
    </ul>
</div>

```javascript_exercise7
```
