## Exercice 20 : réactivité - corrigez le code

Ce code qui est censé afficher une alerte dans la console à chaque modification de l'objet ne fonctionne pas. Corrigez-le et expliquez :)

---

```javascript_exercise20
const singleLevelObjectCompare = (obj1, obj2) => {
   for (const prop in obj1) {
       if (obj1.hasOwnProperty(prop) && obj1[prop] !== obj2[prop]) {
           return false;
       }
   }
   
   for (const prop in obj2) {
       if (obj2.hasOwnProperty(prop) &&  obj1[prop] !== obj2[prop]) {
           return false;
       }
   }

   return true;
};

const addReactiveCallback = (obj, callback) => {
    let original = obj;
    setInterval(() => {
        if (!singleLevelObjectCompare(obj, original)) {
            callback(obj);
            original = obj;
        }
    }, 300);
};

const obj = { size: 'medium' };
addReactiveCallback(obj, () => console.log('changed'));
obj.size = 'big';
setTimeout(() => { obj.size = 'small'; }, 3000);

```
