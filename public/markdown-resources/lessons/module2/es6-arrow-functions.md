## Les fonctions fléchées

On entre dans le dur, car les fonctions fléchées, bien qu'elles ne représentent pas une grande complexité, constituent un changement majeur dans la façon d'écrire le code et c'est relativement déroutant au début.

On ne peut pas y échapper, elles font partie des bonnes pratiques et sont incontournables avec React.

Jadis naguère vous écriviez ceci :
```javascript_before
function calc(value1, value2) {
  return value1 + value2;
}
```
Vous déclarerez désormais cette fonction de cette façon : 
 ```javascript
const calc = (value1, value2) => {
    return value1 + value2;
}
```

...ou éventuellement, pour les adeptes des one-liners :
 ```javascript
const calc = (value1, value2) => value1 + value2;
```

Il est important de se familiariser avec cette syntaxe car elle va fréquemment de pair avec la déstructuration qui représente encore un nouveau niveau de difficulté. Il n'y a pas de lien entre les deux mais la combinaisons de ces syntaxes rend le code difficile à lire pour les habitués du JS ancien modèle.

Pour visualiser la différence dans un autre contexte imaginons un écouteur d'événement, allez un peu de nostalgie mettons du jQuery :

Nous avons fréquemment écrit ce genre de choses :
 ```javascript_before
$('.button').click(function (event) {
  event.preventDefault();
  // ...whatever
});
```

Voici l'équivalent vanilla JS / ES6:
 ```javascript
document.querySelector('.button').addEventListener('click', event => {
  event.preventDefault();
  // ...whatever
});
```

Et pour finir un exemple que vous rencontrerez trèèèèèès souvent, une fonction fléchée en pleine action dans un appel à la méthode `map` du prototype des tableaux (ça existait avant ES6 des fois que vous vous poseriez la question).

Nous aurions pu écrire ceci il y a quelques ~~siècles~~ temps :
```javascript_before
var data = [
  { lastName: 'Durand', firstName: 'Luc' },
  { lastName: 'Dupont', firstName: 'Léa' }
];
var i, r = [];
for (i=0; i<data.length; i++) {
   r.push(data[i].firstName + ' ' + data[i].lastName);
}
```

Voici l'équivalent vanilla JS / ES6:
 ```javascript
const data = [
    { lastName: 'Durand', firstName: 'Luc' },
    { lastName: 'Dupont', firstName: 'Léa' },
];
const r = data.map(item => (
    item.firstName + ' ' + item.lastName
));
```
Vous remarquerez ci-dessus une variation dans la syntaxe : en lieu et place des accolades qui délimitent habituellement le corps des fonctions on a utilisé des parenthèses. Avec cette syntaxe, on économise simplement le return : l'ensemble de l'expression évaluée dans les parenthèses sera renvoyée. Il est aussi possible de se passer des parenthèses lorsqu'on reste sur une seule ligne pour un résultat identique :
 ```javascript
const data = [
    { lastName: 'Durand', firstName: 'Luc' },
    { lastName: 'Dupont', firstName: 'Léa' },
];
const r = data.map(item => item.firstName + ' ' + item.lastName);
```
    
---

## Exercice 3 :

<div role="alert" class="alert alert-info show">
    Comme vous le faites très justement remarquer, il serait opportun d'utiliser les littéraux de gabarits ici.
    Réécrivez donc cette méthode pour utiliser les littéraux de gabarits.
</div>

```javascript_exercise3
const data = [
   { lastName: 'Durand', firstName: 'Luc' },
   { lastName: 'Dupont', firstName: 'Léa' },
];
const r = data.map(item => item.firstName + ' ' + item.lastName);
```
