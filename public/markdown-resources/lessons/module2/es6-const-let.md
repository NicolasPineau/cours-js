## Les mots-clés `const` et `let`

Déclarer une variable en Javascript s'était toujours fait de la façon suivante :
```javascript_before
var value = 10;
```

...mais c'est fini. Deux cas de figure à présent :

- La valeur de la variable ne **peut pas** changer (immutable) :
```javascript
const value = 10;
```
- La valeur de la variable **peut** changer :
 ```javascript
 let value = 10;
 ```
---
Le fonctionnement de `const` est assez simple à tester dans la console de n'importe quel navigateur récent :

> ![const error](/markdown-resources/pictures/const-error.png)

---

`var` reste exploitable pour des raisons évidentes de compatibilité mais on ne l'utilisera plus.

Une petite subtilité : inutile de déclarer vos tableaux avec let à moins que vous n'ayez absolument besoin de les réassigner. En JS les tableaux sont des objets et lorsque vous utilisez les méthodes de leur prototypes tels que `push` ou `pop` vous modifiez le contenu du tableau mais pas sa référence qui reste fixe :
 ```javascript
 const planets = ['Mercury', 'Venus', 'Saturn'];
 planets.push('Earth'); // <-- OK
 planets.pop();         // <-- toujours OK
 planets = [];          // <-- ERREUR !
 ```

---

## Exercice 1 :
<div role="alert" class="alert alert-info show">
    <ul>
        <li>Déclarez une constante appelée `user` avec comme contenu un objet avec une seule clé 'name' ayant pour valeur 'John Doe'.</li>
        <li>Déclarez une constante appelée `i` ayant pour valeur 10 puis modifiez-là pour mettre 20. Observez le comportement puis corrigez le code.</li>
    </ul>
</div>

```javascript_exercise1
```
