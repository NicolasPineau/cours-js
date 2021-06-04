## Exercice 11 : compléter le code

Le petit helper ci-dessous formate un objet qu'on lui passe en paramètre. Il renvoie le résultat sous forme de chaîne contenant du HTML.

```javascript
const formatAddress = address => {
  const mandatoryAttributes = ['street', 'zipCode', 'city'];
  if (mandatoryAttributes.some(key => !Object.prototype.hasOwnProperty.call(address, key))) {
    return 'Adresse incomplète';
  }

  const { street, street2 = '', zipCode, city } = address;

  return `<ul>
        <li>${street}</li>
        <li>${street2 || '-'}</li>
        <li>${zipCode} ${city}</li>
    </ul>`;
};
```

Actuellement il est capable de gérer les clés street, street2, zipCode et city. Modifiez-le de sorte que les valeurs de tous les autres attributs fournis à l'objet soient affichés dans le code HTML.

Voici un exemple de ce qui est attendu :

- Si on appelle le helper ainsi :
```javascript
console.log(formatAddress({
  street: '120 rue de Meaux',
  zipCode: 60300,
  city: 'Senlis',
  doorCode: 'AB123',
  description: 'Portail bleu',
}));
``` 
- ...on doit obtenir le code HTML suivant (ne pas se soucier de l'indentation):

```html
<ul>
    <li>120 rue de Meaux</li>
    <li>-</li>
    <li>60300 Senlis</li>
    <li>AB123</li>
    <li>Portail bleu</li>
</ul>
```

---

<div role="alert" class="alert alert-info show">
    Ci-dessous votre proposition
</div>

```javascript_exercise11
```

---

## Solution :

```javascript
const formatAddress = address => {
  const mandatoryAttributes = ['street', 'zipCode', 'city'];
  if (mandatoryAttributes.some(key => !Object.prototype.hasOwnProperty.call(address, key))) {
    return 'Adresse incomplète';
  }

  const { street, street2 = '', zipCode, city, ...rest } = address;

  return `<ul>
        <li>${street}</li>
        <li>${street2 || '-'}</li>
        <li>${zipCode} ${city}</li>
        ${Object.values(rest).map(val => `<li>${val}</li>`).join('')}
    </ul>`;
};
```
