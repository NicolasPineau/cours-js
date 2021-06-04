## L'affectation par décomposition

Il est possible de décomposer des valeurs alors qu'on les assigne.

D'abord un exemple simple :

Avant :
```javascript_before
var coordinates = getCoordinates();
var latitude = coordinates.latitude;
var longitude = coordinates.longitude;
```

Maintenant :
```javascript
const { latitude, longitude } = getCoordinates();
```

Idem si notre fonction renvoie un tableau plutôt qu'un objet, avant :

```javascript_before
var coordinates = getCoordinates();
var latitude = coordinates[0];
var longitude = coordinates[1];
```

Maintenant :
```javascript
const [ latitude, longitude ] = getCoordinates();
```

Cet opérateur prend tout son sens dans les arguments des fonctions. Là aussi il est possible de les décomposer pour les récupérer :

Avant :
```javascript_before
function writeLog(date, data) {
  api.log(date, data.file, data.error);
};
```

Maintenant :
```javascript
writeLog(date, { file, error }) {
  api.log(date, file, error);
};
```
Ceci présente entres autres l'avantage d'être explicite. A la lecture de la signature de la méthode on sait immédiatement ce qu'elle attend.

Une subtilité bien utile: il est aussi possible de renommer la variable au moment de l'assignation par décomposition. La preuve par l'exemple : 

```javascript
const name = "Marie";
const company = { id: 1225, name: "Google" };
const { name: companyName } = company;        /** companyName = "Google" **/
```

ça ne s'arrête pas là... il peut y avoir parfois une arborescence profonde. La décomposition nous permet aussi de naviguer dans cette profondeur pour aller chercher les éléments qui nous intéressent. 

Voici un exemple :

```javascript
const area = {
  Europe: {
    France: {
      Paris: {
        Airports: [
          {
            code: "CDG",
            name: "Aéroport de Paris-Charles-de-Gaulle",
          },
          {
            code: "ORY",
            name: "Aéroport de Paris-Orly",
          },
        ],
      },
    },
  },
};

const { Europe: { France: { Paris: { Airports: [ { code } ] } } } } = area;  /** code = "CDG" **/
```

Certes c'est inutile mais c'est juste une démonstration.

Une précision : il est possible d'affecter une valeur par défaut à tout ce que l'on décompose, au cas où la décomposition ne puisse pas aboutir à assigner une valeur. Voici un exemple :
```javascript
const phone = { type: 'android', date: 2009 };
const { type, date, isObsolete = false } = phone;   /** isObsolete = false **/

```

Une autre précision : il est aussi possible de "renommer" une variable :
```javascript
const time = { hours: 20, minutes: 35, seconds: 48 };
const { hours: h, minutes: m } = time;
console.log(`Il est ${h}:${m}`);
```

Avant que vous ne demandiez, oui on peut faire les deux, même si c'est pas jojo :
```javascript
const { name: newName = 'default' } = data;
``` 

Ne pas oublier qu'il est aussi possible de combiner cela avec l'opérateur de reste...

---

## Exercice 6 :

<div role="alert" class="alert alert-info show">
    A partir de l'objet ci-dessous, récupérez la devise italienne dans une variable nommée 'cur' et le reste des propriétés de l'Italie dans un objet appelé 'rest'.
</div>

```javascript_exercise6
const data = {
  countries: {
    france: { },
    spain: { },
    italy: {
      capital: 'Rome',
      area: 301336,
      timezone: 'UTC +1: (CET)',
      currency: 'EUR',
      language: 'italian',
    },
  },
};

```
