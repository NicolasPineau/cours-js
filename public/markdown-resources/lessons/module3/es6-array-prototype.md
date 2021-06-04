## Le prototype des tableaux depuis ES6

A partir d'ES6 le prototype des tableau a été complété avec des méthodes très utiles que vous connaissez peut-être déjà.

### find

Cette méthode permet de chercher un élément dans un tableau. Si l'élément est trouvé il sera renoyé par la fonction, dans le cas contraire elle renverra la valeur `undefined`.
```javascript_before
var tags = ['blockquote', 'span', 'div', 'table', 'ul'];
var divTag = tags.filter(function (tag) { return tag === 'div'; })[0];
```

```javascript
const tags = ['blockquote', 'span', 'div', 'table', 'ul'];
const divTag = tags.find(tag => tag === 'div');
```

### findIndex

Cette fonction réalise le même travail que `find` mais au lieu de renvoyer la valeur trouvée ellke renvoie son index dans le tableau, ou -1 si non trouvée.

```javascript
const tags = ['blockquote', 'span', 'div', 'table', 'ul'];
const divTagIndex = tags.findIndex(tag => tag === 'div');
```

### reduce

En réalité `reduce` existait dans les spécifications avant ES6.

Schématiquement, cette fonction a pour but de transformer un tableau en la réduisant à une autre valeur. Cette autre valeur peut-être un booléen, une chaîne, un objet, un autre tableau...

S'agissant d'une fonction un peu complexe abordons-là avec un exemple basique : 

```javascript_before
var values = [10, 20, 3, 8, 41, 13];
var total = 0;
values.forEach(function (value) {
    total += value;
})
```

```javascript
const values = [10, 20, 3, 8, 41, 13];
const total = values.reduce((acc, cur) => acc + cur, 0);
```

Ci-dessous on utilise reduce pour réduire un tableau à une seule dimension :

```javascript
const values = [[10, 20], [3], [8, 41, 13]];
const reducedValues = values.reduce((acc, cur) => acc.concat(cur), []);
```

A présent un exemple un peu plus complexe :

```javascript
const peoples = [
  {
    name: 'Jack Sulivan',
    profession: 'butcher',
  },
  {
    name: 'Andrew Johnson',
    profession: 'baker',
  },  
  {
    name: 'Lucinda Park',
    profession: 'baker',
  },
  {
    name: 'Ernest Hattaway',
    profession: 'florist',
  },
  {
    name: 'Ruth Billmore',
    profession: 'butcher',
  },
  {
    name: 'Stephen Banks',
    profession: 'baker',
  },
];

const professionStats = peoples.reduce((acc, cur) => ({
    ...acc,
    [cur.profession]: (acc[cur.profession] || 0) + 1,
}), {});
```

---

## Exercice 15 :
<div role="alert" class="alert alert-info show">
    Plus difficile... fabriquez à partir du tableau un objet de produits indexé par identifiant.  
</div>

```javascript_exercise15
const products = [
    {
        id: 1,
        code: 'SKU0001',
        name: 'Vacuum cleaner'
    },
    {
        id: 2,
        code: 'SKU0002',
        name: 'Lawn mower',
    },
    {
        id: 3,
        code: 'SKU0003',
        name: 'Blender',
    },
    {
        id: 4,
        code: 'SKU0004',
        name: 'Microwave oven',
    },
];

const indexProducts = products.reduce(/** ?? **/);
```

