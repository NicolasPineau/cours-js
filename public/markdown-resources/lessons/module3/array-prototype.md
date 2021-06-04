## Le prototype des tableaux

Tout d'avord une petite révision de quelques méthodes existantes du prototype des tableaux, ici des sucres syntaxiques pour la boucle for.

### forEach

Parcours de tableau :

```javascript_before
var fruits = ['apple', 'banana', 'orange'];
for (var i=0; i<fruits.length; i++) {
    console.log(fruits[i]);
} 
```

```javascript
const fruits = ['apple', 'banana', 'orange'];
fruits.forEach(fruit => {
    console.log(fruits[i]);
});
```
### map

Idem que précédemment, si ce n'est que la méthode `map` renvoie une copie du tableau dont chaque valeur a été modifiée par la fonction de callback.  :

```javascript_before
var fruits = ['apple', 'banana', 'orange'];
var upperCasedFruits = [];
for (var i=0; i<fruits.length; i++) {
    fruits[i] = fruits[i].toUpperCase();
} 
```

```javascript
const fruits = ['apple', 'banana', 'orange'];
const upperCasedFruits = fruits.map(fruit => fruit.toUpperCase());
```

### filter

Cette fonction permet de filtrer les éléments d'un tableau. Comme `map` elle renvoie une copie du tableau source.

```javascript_before
var fruits = ['apple', 'banana', 'orange', 'cherry', 'strawberry'];
var redFruits = [];
for (var i=0; i<fruits.length; i++) {
    if (fruits[i] != 'banana') {
        redFruits.push(fruit);
    }
} 
```

```javascript
const fruits = ['apple', 'banana', 'orange', 'cherry', 'strawberry'];
const redFruits = fruits.filter(fruit => fruit !== 'banana');
```

### every / some

Ces deux fonctions permettent respectivement de vérifier si tous les éléments d'un tableau remplissent une condition (pour `every`) ou au moins l'un d'entre eux (pour `some`).

```javascript_before
var fruits = ['apple', 'banana', 'orange', 'cherry', 'strawberry'];
var hasCherry = false;
for (var i=0; i<fruits.length; i++) {
    if (fruits[i] == 'cherry') {
        hasCherry = true;
        break;
    }
} 
```

```javascript
const fruits = ['apple', 'banana', 'orange', 'cherry', 'strawberry'];
const hasCherry = fruits.some(fruit => fruit === 'cherry');
```

---

```javascript_before
var names = ['léo', 'romane', 'olivier', 'marco', 'odile'];
var allNamesHaveO = true;
for (var i=0; i<names.length; i++) {
    if (names[i].indexOf('o') == -1) {
        allNamesHaveO = false;
        break;
    }
} 
```

```javascript
const names = ['léo', 'romane', 'olivier', 'marco', 'odile'];
const allNamesHaveO = fruits.every(fruit => fruit.indexOf('o') !== -1);
```

---

## Exercice 13 :
<div role="alert" class="alert alert-info show">
    Transformez le tableau d'objet ci-dessous en tableau de chaînes en remplaçant pour chaque valeur l'objet par la valeur de la clé <code>name</code>.  
</div>

```javascript_exercise13
const cosmonauts = [
    {
        name: 'Neil Armstrong',
        birthDate: '1930-08-05',
    }, 
    {
        name: 'Buzz Aldrin',
        birthDate: '1930-01-20',
    },
    {
        name: 'Michael Collins',
        birthDate: '1930-10-31',
    }
];

const cosmonautNames = /** ??? **/
```

---

## Exercice 14 :
<div role="alert" class="alert alert-info show">
    Complétez ce code pour réactualiser la date de mise à jour du produit `SKU00002`.  
</div>

```javascript_exercise14
const products = [
    {
        sku: 'SKU00001',
        price: 150,
        updatedAt: 1623716478447,
    }, 
    {
        sku: 'SKU00002',
        price: 210,
        updatedAt: 1623716475336,
    },
    {
        sku: 'SKU00003',
        price: 88,
        updatedAt: 1623716342114,
    }
];

const productToUpdate = {
    sku: 'SKU00002',
    updatedAt: Date.now(),
};

const updatedProducts = products.map(/** ??? **/);
```
