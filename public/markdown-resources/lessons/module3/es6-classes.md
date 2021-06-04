## Les classes

Javascript n'est pas un langage orienté objet, les classes sont encore du sucre syntaxique destiné à permettre une écriture de code moins lourde.

Imaginons l'exemple d'un objet `Shape` muni d'une méthode `move`, voici ce que cela donne avant 2015 :

```javascript_before
var Shape = function (id, x, y) {
    this.id = id;
    this.move(x, y);
};
Shape.prototype.move = function (x, y) {
    this.x = x;
    this.y = y;
};
```

Il est à présent possible d'écrire ceci :
```javascript
class Shape {
    constructor (id, x, y) {
        this.id = id
        this.move(x, y)
    }
    move (x, y) {
        this.x = x
        this.y = y
    }
}
```

### Héritage

L'héritage était fastidieux jusqu'alors :

```javascript_before
var Rectangle = function (id, x, y, width, height) {
    Shape.call(this, id, x, y);
    this.width  = width;
    this.height = height;
};
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
var Circle = function (id, x, y, radius) {
    Shape.call(this, id, x, y);
    this.radius = radius;
};
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;
```

![Headache](/markdown-resources/pictures/headache.jpg)

A présent vous pourrez vous contenter de ceci :

```javascript
class Rectangle extends Shape {
    constructor (id, x, y, width, height) {
        super(id, x, y)
        this.width  = width
        this.height = height
    }
}

class Circle extends Shape {
    constructor (id, x, y, radius) {
        super(id, x, y)
        this.radius = radius
    }
}
```

Sentez-vous libres d'aller explorer plus en détail les classes en Javascript, nous n'irons pas plus loin ici car
ce n'est pas une fonctionnalité que vous utiliserez beaucoup dans le cadre de React.

---

## Exercice 16 :
<div role="alert" class="alert alert-info show">
    Ajoutez à cette classe une méthode pour afficher le produit et son prix puis instanciez-là et testez l'affichage.
</div>

```javascript_exercise16
class Product {
    constructor (sku, price) {
        this.sku = sku;
        this.price = price;
    }

    /** ?? **/
}

const myProduct = /** ?? **/
```
