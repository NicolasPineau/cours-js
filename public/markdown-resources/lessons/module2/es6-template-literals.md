## Les littéraux de gabarits

ES6 a introduit un certain nombre de nouveautés qui relèvent du sucre syntaxique, dont celle-ci. Elle hérite d'un nom complexe mais elle est relativement triviale.

Les littéraux de gabarits (template literals) permettent de conserver un code plus lisible tout en réduisant son volume.

Ce qui s'écrivait ainsi :
```javascript_before
var lastName = 'Pineau';
var firstName = 'Nicolas';
var welcomeMessage = 'Bienvenue ' + firstName + ' ' + lastName + ', voici votre café.';
```

... s'écrira à présent comme cela :
```javascript
const lastName = 'Pineau';
const firstName = 'Nicolas';
const welcomeMessage = `Bienvenue ${firstName} ${lastName}, voici votre café.`;
```

Il suffit de troquer les guillemets classiques par des guillemets obliques (backticks) et d'encadrer les expressions par `${}`. 

Simple n'est-ce pas ? A noter que ça fonctionne aussi en multi-ligne :

```javascript
const message = `Bonjour ${customer.name},
il y a ${cart.count} objet(s) dans votre panier
pour un total de ${cart.count * cart.unitPrice} €`
```

---

## Exercice 2 :

<div role="alert" class="alert alert-info show">
    <b>Exercice 2</b> : Complétez le code ci-dessous en ajoutant l'instruction qui permettra de saluer la personne connectée.
</div>

```javascript_exercise2
const person = {
  lastName: 'Lee',
  firstName: 'Stan',
};

alert(/** ??? **/);
```
