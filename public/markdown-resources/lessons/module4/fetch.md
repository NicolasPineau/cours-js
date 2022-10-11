## La fonction `fetch`

Fetch est une API mais nous nous intéresserons surtout à la fonction globale.

La fonction fetch ne fait pas partie des spécifications de l'EcmaScript, elle a été décrite par le WHATWG, un autre groupe qui travaille sur les normes implémentables dans les navigateurs Web.

Cette fonction ne recèle pas de complexité particulière, elle a pour vocation de charger des ressources distantes comme le faisait son ancêtre, l'objet `XMLHttpRequest`.

### Description

```javascript_before
function loadApiData(apiUrl) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}
```

```javascript
const loadApiData = apiUrl => fetch(apiUrl);
```

Un exemple pour récupérer une image (testable dans la console) :

```javascript
fetch('https://cours-js.vercel.app/markdown-resources/pictures/congrats.gif')
  .then(function(response) {
    return response.blob();
  })
  .then(function(myBlob) {
      const objectURL = URL.createObjectURL(myBlob);
      const img = document.createElement('img');
      img.src = objectURL;
      document.body.appendChild(img); 
    });
```

La ressource que nous sollicitons peut mettre du temps à répondre, et la requête peut échouer. `Fetch` renvoie une promesse qui va nous permettre de gérer les deux situations.

---

### Les en-têtes

On peut envoyer avec `fetch` des en-têtes HTTP, choisir la méthode HTTP, et passer des contenus sous diverses formes. Voici une illustration : 

```javascript
export const uploadDocument = document => {
    const formData = new FormData();
    formData.append('document', document);

    const headers = new Headers();
    headers.append('X-Custom-Header', 'AnyValue');

    return fetch('/api/documents', {
        headers: new Headers(headers),
        credentials: 'same-origin',
        method: 'POST',
        body: formData,
    }).then(
        response => (response.ok ? response.json() : Promise.reject()),
    ).catch(
        error => console.error(error)
    );
};
```

Il est aussi possible de lire les en-têtes de la réponse. Dans l'exemple ci-dessous nous nous intéressons au type de contenu afin de déterminer quel traitement appliquer aux données :

```javascript
fetch(myRequest).then(response => {
  const contentType = response.headers.get('content-type');
  if ((contentType || '').indexOf('application/json') === -1) {
    console.error('no JSON');
  }
  
  return response.json().then(json => {
    // traitements
  });
});
```

---

## Exercice 18 :
<div role="alert" class="alert alert-info show">
    Le JSON du plan du cours se trouve ici : `https://cours-js.vercel.app/markdown-resources/misc/lessons.json`.
    Au moyen de fetch, allez récupérer les informations et affichez les dans la console.
    Ensuite, à partir de ces données, extrayez un tableau des pages contenant la lettre 'e' trié par ordre alphabétique.
</div>

```javascript_exercise18
    const jsonUri = 'https://cours-js.vercel.app/markdown-resources/misc/lessons.json';
    /** ?? **/
```
