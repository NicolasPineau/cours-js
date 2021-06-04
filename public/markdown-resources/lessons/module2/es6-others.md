## Autres nouveautés ES6

- Une syntaxe raccourci a été adoptée pour la définition des objets dans le cas où on assigne à une clé le contenu d'une variable portant le même nom :

Avant :
```javascript_before
var x = 5, y = 10;
var obj = { x: x, y: y };
```

Maintenant :
```javascript
const x = 5, y = 10;
const obj = { x, y };
```

- Les clés des objets peuvent être des expressions calculées :

Avant :
```javascript_before
var person = {
  name: "Thomas Legrand"
};
person["resultatQuiz" + quizzId] = 100;
```

Maintenant :
```javascript
const langCode = 'fr';

const translations = {
  name: 'Retry',
  [`lang${langCode}`]: 'Essayer à nouveau',
};
```

- La notation 'méthode' est désormais disponible dans la définition des objets :

Avant :
```javascript_before
var storage = {
    read: function (key) {
      /** ... **/
    },
    write: function (key, data) {
       /** ... **/
    }
};
```

Maintenant :
```javascript
const storage = {
    read (key) {
      /** ... **/
    },
    write (key, data) {
       /** ... **/
    }
};
```

- Nouvelles possibilités de formatage localisé de dates :

```javascript
  (new Intl.DateTimeFormat('fr-FR')).format(new Date('2015-01-02'));
```

- ainsi que de valeurs monétaires :
```javascript
  (new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })).format(100.20);
```

- ou de nombres :
```javascript
(new Intl.NumberFormat('de-DE')).format(1234567.89)
```

Pour terminer quelques nouveautés dans le prototype de `String` :

```javascript
"hello".startsWith("ello", 1); // true
"hello".endsWith("hell", 4);   // true
"hello".includes("ell");       // true
"hello".includes("ell", 1);    // true
"hello".includes("ell", 2);    // false
```

---

## Exercice 8 :

<div role="alert" class="alert alert-info show">
    Ecrivez une méthode dans un objet dont la fonction sera de créer un objet avec comme clé <b><u>la valeur</u></b> du premier argument et comme valeur un tableau avec tous les autres arguments fournis à la fonction.
</div>

```javascript_exercise8
export const tools = {
    /** ??? **/
}; 
```
