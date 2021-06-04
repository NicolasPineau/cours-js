## L'opérateur de décomposition

Le second job de notre opérateur "trois petits points" est un peu plus costaud.

Schématiquement, dans le contexte d'utilisation en tant qu'opérateur de "reste", nous collectons des données pour les compiler dans une variable.

Ici c'est un nouveau contexte : cet opérateur peut servir à "éclater" des données. Il aurait pu s'appeler opérateur d'éclatement (en plus ça aurait été raccord avec mon logo).

D'abord un exemple simple :

```javascript
const data = ['one', 'two', 'three', 'four'];
const newData = [...data, 'five'];
```

Ci-dessus, nous déclarons un tableau de 4 éléments. A la ligne suivante, nous déclarons un second tableau en utilisant la décomposition du premier.

La ligne suivante ;

```javascript
const newData = [...data, 'five'];
```
... est strictement identique dans son effet à celle-ci :

```javascript
const newData = ['one', 'two', 'three', 'four', 'five'];
```

Imaginez que la variable est un éventail, `...` sert à l'ouvrir.

![Eventail](/markdown-resources/pictures/fan.gif)

Vous allez dire : "facile...". Jusque là oui.
Mais ensuite il faudra le faire intervenir dans des contextes un peu plus touchy :)

Ici encore, ça fonctionne pour les objets. D'ailleurs c'est probablement pour les objets qu'on utilise le plus cet opérateur.

```javascript
const address = {
  street: '30 Rue de Meaux',
  zipCode: '60300',
  city: 'Senlis',
};
const latitude = 49.20347599347024;
const longitude = 2.5888224271329876;

const completeAddress = { ...address, latitude, longitude };
```

Il faut également s'arrêter sur un usage spécifique de cet opérateur : on l'utilise parfois pour cloner un objet ou un tableau lorsque l'on veut utiliser une copie afin de ne pas modifier une variable en entrée. C'est particulièrement vrai en React ou la modification directe d'une variable peut casser la réactivité.

```javascript
const newArray = [...sourceArray];
const newObject = { ...sourceObject };
```

A noter que ce type de copie ne clone pas en profondeur, si par exemple on utilise cette méthode pour cloner un tableau d'objets, les références aux objets ne seront pas clonées dans le second tableau.

Petit détail amusant (ou pas), il est aussi possible de décomposer une chaîne :

```javascript
const exploded = [..."split me"]; /** --> ["s", "p", "l", "i", "t", " ", "m", "e"] **/
```

---

## Exercice 5 :

<div role="alert" class="alert alert-info show">
    Créez un objet qui soit "la fusion" des deux objets ci-dessous. Vous compléterez cet objet avec une autre propriété de votre choix.
</div>

```javascript_exercise5
const position = {
    x: 125.2,
    y: 41.9,
};

const dynamics = {
    speed: 95,
    angle: 125,
};

const ballProps = {
    /** ??? **/
};

```
