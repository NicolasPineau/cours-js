## Exercice 9 : corriger le code

Ce code est truffé d'erreurs.

```javascript
const loadStorage = ([ key, defaultValue = undefined ]) = {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === 'null') {
      return defaultValue;
    

    return JSON.parse(serializedState);
  } catch (err) {
    return defaultvalue;
  }
};

const saveStorage = ([ key, ....rest ]) = {
  try {
    localStorage.setitem(key, JSON.stringify(rest));
  } catch {
    console.error('Could not save to local storage');
  }
};
```

Normalement on l'appelle ainsi pour écrire les données dans le stockage local du navigateur :
 
 ```javascript
saveStorage({ key: 'ma-cle', valeur1: 'TEST', valeur2: 'Autre test' });
```
...et on lit les données ainsi : 
 ```javascript
console.log(loadStorage({ key: 'ma-cle', defaultValue: 'vide' }));
```

Corrigez le code pour qu'il fonctionne !

1. La sauvegarde et la lecture doivent fonctionner.
2. La lecture avec une clé inexistante doite renvoyer la valeur fournie dans la clé `defaultValue`.

---

<div role="alert" class="alert alert-info show">
    Ci-dessous votre proposition
</div>

```javascript_exercise9
```
