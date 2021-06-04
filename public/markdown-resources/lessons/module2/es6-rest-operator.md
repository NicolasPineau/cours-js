## L'opérateur de reste

Nous allons bientôt aborder la délicate fonctionnalité de la déstructuration, mais auparavant nous devons nous arrêter sur un opérateur qui est arrivé avec l'ES6 : nous l'appelerons "les trois petits points".

Cet opérateur a deux fonction distinctes.
- Nous allons commencer par la plus simple, l'opérateur de "reste".

Son but est de "collecter" l'ensemble des données d'un tableau ou d'un objet qui n'ont pas été assignées. C'est un peu abstrait comme ça mais ça le sera moins avec un exemple :

```javascript
const data = ['Blue', 'Red', 'Green', 'Yellow', 'Pink', 'Black', 'Purple'];
const [color1, color2, color3, ...allOtherColors] = data;
```
Ci-dessus nous avons assigné les 3 premières valeurs du tableau à des constantes.
Les variables `color1`, `color2` et `color3` ont pour valeur respectivement "Blue", "Red", "Green".
Quant à `allOtherColors`, elle "collecte" tout ce qui reste dans le tableau à ne pas avoir été assigné, et donc deviendra un tableau qui prendra pour valeur `["Yellow", "Pink", "Black", "Purple"]`.

Chose merveilleuse avec ce petit opérateur, cela fonctionne aussi sur les objets. Absolument in-dis-pen-sable en React.

```javascript
const data = {
  city: 'Senlis',
  age: 22,
  size: 175,
  active: true,
  languages: ['fr', 'en'],
};

const { age, size, ...allOtherProperties } = data;
```

C'est la même chose : les variables `age` et `size` prennent les valeurs 22 et 175, et `allOtherProperties` deviendra l'objet suivant :
```javascript
{
  city: 'Senlis',
  active: true,
  languages: ['fr', 'en'],
}
```
<div role="alert" class="alert alert-info show">
    Il est important de préciser que l'opérateur doit toujours être sur le <b>dernier</b> paramètre.
</div>

On peut utiliser cet opérateur comme dernier argument d'une fonction :
```javascript
const sendMessage(recipient, ...message) => {
  /** ... **/
}
```

Dans ce contexte, la variable message va collecter tous les arguments fournis à la fonction à partir du second et les compiler dans un unique tableau. 

---

## Exercice 4 :

<div role="alert" class="alert alert-info show">
    Avec une seule instruction, essayez d'extraire du tableau ci-dessous le premier élément dans un objet <code>person1</code> et les deux derniers dans un tableau <code>others</code>. Ensuite, avec une nouvelle instruction, essayez d'extraire les trois derniers attributs de <code>person1</code> dans un objet <code>person1Info</code>.
</div>

```javascript_exercise4
const data = [
  {
    name: 'Brian',
    age: 20,
    genre: 'male',
    size: 180,
  },
  {
    name: 'Jenny',
    age: 50,
    genre: 'female',
    size: 175,
  },
  {
    name: 'Paul',
    age: 8,
    genre: 'male',
    size: 130,
  }
];
```
