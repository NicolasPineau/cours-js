## Mini projet

Bravo d'être arrivé jusqu'ici !

![Bravo](/markdown-resources/pictures/congrats.gif)

Puisqu'à présent Vanilla JS et l'ES6 n'ont plus de secret pour vous alors c'est le moment de mettre la barre un peu plus haut.

Vous allez commencer un petit projet très simple. Il s'agit d'un système de quiz type QCM. Voici en quelques lignes le cahier des charges :

- Ne sont autorisés que Javascript, HTML et CSS (ou SCSS)
- Pas de librairie externe type jQuery ou lodash, uniquement en Vanilla JS et en ES6+
- Ne vous préoccupez pas de la qualité du design (sauf si tout marche, qu'il vous reste du temps et que ça vous motive)
- Il n'est pas nécessaire que le quiz fonctionne sur tablette ou mobile
- Il faut pouvoir naviguer d'une question à l'autre
- A l'issu du quiz le joueur reçoit sa note et on affiche toutes les réponses
- Le quizz doit être alimenté via un tableau d'objets contenant les questions et les réponses respectant la structure ci-dessous :

```javascript
const questions = [
  {
    text: "Quelle est la distance entre la terre et le soleil",
    choices: ['50 millions de km', '100 millions de km', '150 millions de km'],
    answer: 3,
  }, {
     text: "Vrai ou faux : sur Neptune, le vent peut souffler à plus de 2000 km/h",
     choices: ['Vrai', 'Faux'],
     answer: 1,
   },
   /** etc... **/
];
```

### Postez-ici l'URL de votre sandbox :
```javascript_exercise12
```

### Une solution possible :

```javascript

/** ressources/questions **/
export const questions = [
  {
    text: "Quelle est la distance entre la terre et le soleil ?",
    choices: ["50 millions de km", "100 millions de km", "150 millions de km"],
    answer: 3
  },
  {
    text:
      "Vrai ou faux : sur Neptune, le vent peut souffler à plus de 2000 km/h",
    choices: ["Vrai", "Faux"],
    answer: 1
  },
  {
    text:
      "Vrai ou faux : la densité de Saturne est plus faible que celle de l'eau. Si on pouvait la poser sur un océan terrestre, elle flotterait.",
    choices: ["Vrai", "Faux"],
    answer: 1
  },
  {
    text:
      "A quelle distance se trouve Proxima du Centaure, l'étoile la plus proche de nous après le soleil ?",
    choices: [
      "4 milliards de km",
      "400 milliards de km",
      "40 000 milliards de km"
    ],
    answer: 3
  },
  {
    text:
      "Quelle est la caractéristique de l'étoile Stephenson 2-18 de la constellation de l'Écu de Sobieski ?",
    choices: [
      "C'est la plus petite étoile observée à ce jour",
      "Elle est composée de matériaux inconnus",
      "Si elle se trouvait à la place de notre soleil elle engloutirait l'orbite de Saturne."
    ],
    answer: 3
  }
];


/** index.js **/
import { initGame } from "./game/game";
import "./styles.css";

initGame();

/** model/game.js **/
export default class Game {
  constructor(questions) {
    this.answers = [];
    this.questions = questions;
    this.currentQuestionId = 0;
  }

  get currentQuestion() {
    if (0 === this.questions.length) {
      return null;
    }

    return this.questions[this.currentQuestionId];
  }

  setCurrentQuestionAnswer(answer) {
    this.answers[this.currentQuestionId] = answer;
  }

  isFirst() {
    return this.currentQuestionId === 0;
  }

  isLast() {
    return (
      0 === this.questions.length ||
      this.currentQuestionId === this.questions.length - 1
    );
  }

  moveNext() {
    if (this.currentQuestionId < this.questions.length - 1) {
      ++this.currentQuestionId;
    }
  }

  movePrevious() {
    if (this.currentQuestionId > 0) {
      --this.currentQuestionId;
    }
  }

  getAnswers() {
    return this.answers;
  }

  getScore() {
    const correctAnswers = this.answers.filter(
      (answer, key) => this.questions[key].answer === answer + 1
    ).length;

    return `${correctAnswers} / ${this.questions.length}`;
  }
}

/** helper/helper.js **/
export const buildQuizItem = ({ text, choices }, onSelect) => {
  const res = document.createElement("div");

  /** préparation de la question **/
  const question = document.createElement("div");
  question.classList.add("question");
  question.innerHTML = text;
  res.appendChild(question);

  /** ajout des réponses **/
  const radioName = `o${Date.now()}`;
  choices
    .map((choice, key) => {
      const option = document.createElement("input");
      option.type = "radio";
      option.name = radioName;
      option.id = `${radioName}[${key}]`;
      option.addEventListener("click", () => {
        onSelect(key);
      });

      const label = document.createElement("label");
      label.innerHTML = choice;
      label.htmlFor = `${radioName}[${key}]`;

      const answer = document.createElement("div");
      answer.appendChild(option);
      answer.appendChild(label);

      return answer;
    })
    .forEach((answer) => {
      res.appendChild(answer);
    });

  return res;
};

export const buildQuizResult = (game) => {
  const answers = game.getAnswers();
  const result = document.createElement("div");

  game.questions.forEach(({ text, choices, answer }, key) => {
    const answerWrapper = document.createElement("div");
    answerWrapper.classList.add(
      answer === answers[key] + 1 ? "success" : "failure"
    );
    answerWrapper.innerHTML = `<p>${text} :<br /><b>${
      choices[answer - 1]
    }</b></p>`;
    result.appendChild(answerWrapper);
  });

  return result;
};


/** game.js **/
import { buildQuizItem, buildQuizResult } from "../helper/helper";
import { questions } from "../resources/questions";
import Game from "../model/game";

export const initGame = () => {
  const game = new Game(questions);
  const questionWrapper = document.querySelector(".question-wrapper");
  const prevButton = document.querySelector("button.prev");
  const nextButton = document.querySelector("button.next");

  const redraw = () => {
    questionWrapper.innerHTML = "";
    questionWrapper.appendChild(
      buildQuizItem(game.currentQuestion, (answer) => {
        game.setCurrentQuestionAnswer(answer);
      })
    );
    prevButton.style.display = game.isFirst() ? "none" : "block";
  };

  const finish = () => {
    const score = game.getScore();
    questionWrapper.innerHTML = `Quiz terminé, votre score est de <b>${score}</b>`;
    questionWrapper.appendChild(buildQuizResult(game));
    prevButton.style.display = "none";
    nextButton.style.display = "none";
  };

  prevButton.addEventListener("click", () => {
    game.movePrevious();
    redraw();
  });

  nextButton.addEventListener("click", () => {
    if (game.isLast()) {
      finish();

      return;
    }
    game.moveNext();
    redraw();
  });

  redraw();
};

```
