import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { tracked as Tracked } from 'tracked-built-ins';
import { set } from '@ember/object';
import { later } from '@ember/runloop';
import { service } from '@ember/service';

export default class TwosRoute extends Route {
  @service router;
  @service menuService;

  params = Tracked({
    title: 'Get ready...',
    timer: 5,
  });
  timerInterval = 0;
  currentAssignments = Tracked(this.newAssignments());


  // Imported & adapted from from https://www.w3schools.com/JS/js_random.asp
  // & https://stackoverflow.com/a/45736188
  // min & max inclusive
  rng(min, max, numbersBeforeDecimal = -1) {
    let decimalModifier = 10^numbersBeforeDecimal;
    return numbersBeforeDecimal == -1
      ? Math.floor(Math.random() * (max - min + 1) ) + min
      : ((Math.random() * (max*decimalModifier - min*decimalModifier + 1) ) + min*decimalModifier) /decimalModifier
  }

  assignmentCalculate(operator) {
    let number1, number2;
    let wrong1, wrong2;
    let answer;
    let plusOrMinus = operator == '-' || operator == '+';

    if (plusOrMinus) {
      number1 = this.rng(0, 56);
      number2 = this.rng(0, 11);
    } else {
      number1 = this.rng(0, 15);
      number2 = this.rng(1, 15);
    }

    switch (operator) {
      case '/':
        answer = number1 / number2;
        break;

      case '*':
        answer = number1 * number2;
        break;

      case '-':
        answer = number1 - number2;
        break;

      default:
        answer = number1 + number2;
        break;
    }

    if (plusOrMinus) {
      wrong1 = answer + this.rng(2, 9);
      wrong2 = answer - this.rng(1, 15);
    } else {
      wrong1 = answer * this.rng(2, 3, 5);
      wrong2 = answer / this.rng(2, 5, 3);
    }

    return this.assignmentChoose(
      `${number1}${operator}${number2}`,
      `${number1} ${operator} ${number2} is ?`,
      answer,
      wrong1,
      wrong2
    );
  }

  newAssignments() {
    let selection = [];

    let premades = [
      this.assignmentChoose('e', 'What is E?', Math.E, this.rng(1, 5, this.rng(1, 2)), this.rng(0, 7, this.rng(1,2))),
      this.assignmentChoose('pi', 'What is pi?', Math.PI, this.rng(1, 4, this.rng(1,2)), this.rng(0, 4, this.rng(1,2))),
    ];

    selection.push(premades[this.rng(0, premades.length - 1)]);

    ['-', '+', '/', '+', '*'].forEach((operator) => {
      selection.push(this.assignmentCalculate(operator));
    });

    selection = selection.concat(premades);

    return selection;
  }

  assignmentChoose(id, prompt, correct, wrong1, wrong2) {
    let options = [];
    let inserts = [wrong1, wrong2, correct];
    for (let i = 0; i < inserts.length; i++) {
      let correctLocation = this.rng(0, options.length);
      options.splice(correctLocation, 0, inserts[i]);
    }

    return {
      choose: true,

      id: id,
      prompt: prompt,
      correct: correct,
      options: options,
    };
  }

  @action
  minusTimer() {
    this.params.timer -= 1;
    if (this.params.timer <= 0) {
      clearInterval(this.timerInterval);
      document.getElementById('overlay').style.height = '100vh';

      later(
        this,
        function () {
          this.params.timer = 5;
          this.currentAssignments = Tracked(this.newAssignments());
          this.refresh();
        },
        2000
      );
    }
  }

  model() {
    set(this, 'title', 'Get ready...');

    this.timer = 4;

    later(() => {
      document.getElementById('overlay').style.height = '0vh';
      this.timerInterval = setInterval(this.minusTimer, 1000);
    }, 2000);

    return {
      params: this.params,
      assignments: this.currentAssignments,
      answer: this.answer,
    };
  }

  @action
  willTransition(transition) {
    clearInterval(this.timerInterval);
  }

  @action
  answer(e) {
    console.log(this.currentAssignments);
    let clickedButton = e.target;
    let assignment = this.currentAssignments.find(
      (assignment) => assignment.id == clickedButton.className
    );

    if (assignment.correct == clickedButton.value) {
      console.log('right');
      console.log(this.timer);
      this.params.timer += 3;
      this.currentAssignments.splice(this.currentAssignments.indexOf(assignment), 1);
    } else {
      console.log('wrong');
      this.params.timer -= 3;
    }

    if (this.currentAssignments.length == 0) {
      this.menuService.getKey('maxi');
      clearInterval(this.timerInterval);
    }
  }
}
