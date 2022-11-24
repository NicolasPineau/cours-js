## Mix :

### Exercice 31

<div role="alert" class="alert alert-info show">
    Remplacez les ********** dans le code ci-dessous pour qu'il soit opérationnel.    
</div>

```javascript_exercise31
const tools = {
  check(callback, **********values) {
    if (!values.every(callback)) {
      return Promise.**********();
    }

    return Promise.resolve();
  }
};

tools.check(item => item.toUpperCase() === item, 'LOREM', 'IPSUM', 'DOLOR')
  .**********(() => {
    console.log('Everything is OK');
  }, () => {
    console.error('Something is wrong');
  });
```

---

### Exercice 32

<div role="alert" class="alert alert-info show">
    Au moyen de [].reduce, transformez ce tableau en chaîne (pensez à incorporer des espaces).     
</div>

```javascript_exercise32
const baseData = ['The', 'Quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog'];
const simpleString = ....
```

---

### Exercice 33

<div role="alert" class="alert alert-info show">
    Avec une seule instruction, déclarer un tableau contenant les clés de l'objet ci-dessous qui ne sont pas constituées de chiffres. 
</div>

```javascript_exercise33
const obj = {
  name: 'Billy',
  date: '2022-11-24',
  color: 'red',
  5: 'Not me',
  30: 'I’m bad',
};

const nonNumericKeys = ....
```

---

### Exercice 34

<div role="alert" class="alert alert-info show">
   Indiquer ce que va afficher ce code et proposer une correction.     
</div>

```javascript_exercise34
const name = 'Lucinda';
const todos = [
  'Walking the dog',
  'Repaint the living room',
  'Call Max',
];

document.write(`Hi ${name}<br />Your job : <ul>${todos.forEach(item => `<li>${item}</li>`)}</ul>`);
```

---

### Exercice 35

<div role="alert" class="alert alert-info show">
    Remplacez les **** dans le code ci dessous pour que la propriété `items` soit complétée avec tous les paramètres fournis à la méthode `complete`.   
</div>

```javascript_exercise35
class Test {
    items = [];
    
    complete(*****) {
        *****
        
        return this;
    }
    
    show() {
        console.log(...this.items);
    }
}

(new Test()).complete('val1', 'val2', 'val3').show();
```

---

### Exercice 36

<div role="alert" class="alert alert-info show">
    Remplacez les ***** pour que la clé correspondant à la valeur 'Some incredible data' dans la constante objet `myData` soit la concaténation de toutes les valeurs de la constante tableau `keyParts`.
</div>

```javascript_exercise36
    const keyParts = ['fr', 10, '-', 30, '2022'];

    const myData = {
      *******: 'Some incredible data',
    };
```

---

### Exercice 37

<div role="alert" class="alert alert-info show">
    Déclarez la constante `data` en remplaçant les ******* de sorte que le code affiche "24/11/2022" dans la console.
</div>

```javascript_exercise37
const data = *************;

const [,,{ user: { history: [,,,{ date }] } }] = data;

console.log(date);
```

---

### Exercice 38

<div role="alert" class="alert alert-info show">
    Ce code ne fonctionne pas. Savez-vous pourquoi ?
</div>

```javascript_exercise38
    // tools.js
    export const watchKeys = (callback) => {
        const keys = [];
        let timer = null;
        
        document.addEventListener('keyup', event => {
            keys.push(event.key);
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
                callback(keys);
            }, 300);
        });
    });
    
    // main.js
    import watchKeys from './tools';
    watchKeys(console.log);
```

---

### Exercice 39

<div role="alert" class="alert alert-info show">
    Indiquer selon vous quel est le type de donnée attendu pour chacun des trois arguments de la méthode `toggleClass`.     
</div>

```javascript_exercise39
    const toggleClass = (selector, cssClass, toggle) => {
        document.querySelectorAll(selector).forEach(item => {
            item.classList[toggle ? 'add' : 'remove'](cssClass);
        });
    };
```

---

### Exercice 40

<div role="alert" class="alert alert-info show">
    Indiquer ici, s'il y en a, le nom du ou des étudiants qui vous ont aidé ou conseillé pour avancer sur les exercices.
</div>

```javascript_exercise40

```
