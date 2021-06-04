## Les promesses

L'objet `Promise` est un outil destiné à "gérer" la réussite ou l'échec d'une opération asynchrone.

Majoritairement on exploite des promesses qui nous sont renvoyées, il est plus rare d'avoir besoin de les construire. Nous allons tout de même le faire ici pour en illustrer le fonctionnement.

### `then` et `catch`

La méthode `then` est utilisée pour exploiter le résultat d'une promesse, elle permet de définir le comportement lorsque la promesse est résolue.
Elle prend deux paramètres. Le premier sera appelé en cas de succès, le second si la promesse a échoué.

Voici un exemple de promesse utilisée dans un contexte de temporisation :

```javascript
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise fullfilled');
    }, 5000);
}).then(message => {
    alert(`Success : ${message}`);
}, error => {
    alert(`Error : ${error}`);
});
```

L'objet `Promise` prend deux paramètres qui sont les fonctions de rappels à déclencher lorsque l'on souhaite résoudre la promesse en succès ou en erreur.

<div role="alert" class="alert alert-info show">
    Faites le test dans votre terrain de jeu puis à nouveau en remplaçant `resolve` par `reject`.
</div>

Il s'avère parfois nécessaire de chaîner des actions asynchrones, de façon à ce que chaque action ne soit exécutée qu'après la réponse de la précédente.

Nous aurions pu avoir ce genre de structure :

```javascript_before
firstProcess(function(result) {
  secondProcess(result, function(result2) {
    thirdProcess(result2, function(finalResult) {
      console.log('Final result :' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

Qui, sous forme de promesse, sera écrite ainsi : 

```javascript
firstProcess().then(function(result) {
  return secondProcess(result);
})
.then(function(result2) {
  return thirdProcess(result2);
})
.then(function(finalResult) {
  console.log('Final result : ' + finalResult);
})
.catch(failureCallback);
```

Avec `catch` on va pouvoir intercepter les erreurs liées aux promesses (échec de la réponse) ou au traitement dans la fonction de rappel.

Le code suivant permet de mieux appréhender son fonctionnement :

```javascript
new Promise((resolve, reject) => {
    console.log('Call');
    resolve();
})
.then(() => {
    throw new Error('Something failed');

    console.log('Will never be displayed');
})
.catch(() => {
    console.error('An error occured');
});
```


### Promise.all

La méthode `all` permet d'aggréger plusieurs promesses en une seule. La promesse ainsi obtenue sera résolue lorsque toutes les promesses qu'elle reçoit en paramètre dans le tableau auront été résolues, ou lorsqu'au moins une sera en échec.

```javascript
const onDrop = acceptedFiles => {
    if (!isArray(acceptedFiles) || acceptedFiles.length === 0) {
        return;
    }

    if (acceptedFiles.length + documents.length > MAX_DOCUMENTS_ALLOWED) {
        addError(trans('too_much_files', { count: MAX_DOCUMENTS_ALLOWED }));

        return;
    }

    setIsUploading(true);
    Promise.all(acceptedFiles.map(newFile => (
        uploadDocument(newFile).then(({ filename, name }) => ({
            ...newFile,
            filename,
            name,
        })).catch(() => {
            addError(trans('upload_failed', { name: newFile.name }));
        })
    ))).then(files => {
        onChange(documents.concat(files));
        setIsUploading(false);
    });
};
```  

A noter qu'il existe aussi `Promise.race` qui se résout dès qu'une promesse est résolue ou rejetée, et `Promise.any` qui se résout si au moins une promesse du tableau est résolue.

---

## Exercice 17 :
<div role="alert" class="alert alert-info show">
    Ecrivez via les promesses une méthode qui déclenche un message au bout de deux secondes puis un autre 3 secondes plus tard et un dernier 10 secondes plus tard. 
</div>

```javascript_exercise17
```
