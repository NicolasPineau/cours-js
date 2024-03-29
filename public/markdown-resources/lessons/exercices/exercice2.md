## Exercice 10 : réécrire le code

Ci-dessous un programme de calculatrice le plus basique qui soit, 
composé d'un peu de HTML, de CSS et de JS.

Modifiez le code Javascript pour ne plus utiliser ***jQuery*** et utilisez autant que possible les notions ES6 que nous avons abordées. 
validez que cela fonctionne dans votre terrain de jeu. 

- Le code HTML :
```html
<div class="calculator">
  <div class="keys">
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>+</div>
    <div>-</div>
    <div>=</div>
  </div>
  <input type="text" id="result">
</div>
```

- Le code CSS :
```css
.calculator {
  width: 200px;
  height: 300px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
}

.calculator > .keys {
  display: flex;
  flex-wrap: wrap;
  justify-content: stretch;
}

.calculator > .keys > div {
  flex-basis: calc(100% / 3 - 3px);
  background: salmon;
  margin: 1px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

#result {
  height: 30px;
}
```

- Le code Javascript (jQuery ![scream](/markdown-resources/pictures/scream.png)) :
```javascript
(function(){
	$('.keys > div').each(function (){
  	$(this).click(function(){
    	if ($(this).text() === '=') {
      	try {
      		$('#result').val(eval($('#result').val()));
        } catch (err) {
        	console.error(err);
          $('#result').val('error');
        }
      
      	return;
      }
      
    	$('#result').val($('#result').val() + $(this).text());
    });
  });
})();

```

---

<div role="alert" class="alert alert-info show">
    Ci-dessous votre proposition
</div>

```javascript_exercise10
```
