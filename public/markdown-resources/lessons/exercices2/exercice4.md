## Exercice 22 : Debounce 

Expliquez ce que fait le code ci-dessous

---

```javascript
function debounce (func, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        func.apply(this, args);
    }, delay);
  };
}

const processChange = debounce(() => {
    console.log('Scroll occured');
});

window.addEventListener('scroll', processChange);
```

```javascript_exercise22
```
