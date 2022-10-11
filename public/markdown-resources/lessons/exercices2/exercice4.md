## Exercice 22 : Mystère 

Expliquez ce que fait le code ci-dessous

---

```javascript
function mystery (func, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        func.apply(this, args);
    }, delay);
  };
}

const processChange = mystery(() => {
    console.log('Scroll occured');
});

window.addEventListener('scroll', processChange);
```

```javascript_exercise22
```
