import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { tracked as Tracked } from 'tracked-built-ins';
import { set } from '@ember/object';
import { later } from '@ember/runloop';
import { service } from '@ember/service';

// Imported from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// max not inclusive
function rng(max, numbersBeforeDecimal=-1) {
    return numbersBeforeDecimal == -1 ? Math.floor(Math.random() * max) : (Math.random() * max) * (10*numbersBeforeDecimal);
}


function assignmentCalculate(operator) {
    let number1, number2;
    let wrong1, wrong2;
    let answer;
    let plusOrMinus = operator == '-' || operator == '+';

    if (plusOrMinus) {
        number1 = rng(56);
        number2 = rng(11);
    } else {
        number1 = rng(8, rng(3));
        number2 = rng(8, rng(1));
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
        wrong1 = answer + rng(3);
        wrong2 = answer - rng(5);
    } else {
        wrong1 = answer * rng(3, 5);
        wrong2 = answer / rng(5, 3);
    }

    
    return assignmentChoose(
        `${number1}${operator}${number2}`,
        `${number1} ${operator} ${number2} is ?`,
        answer, wrong1, wrong2
    )
}

function assignments() {
    let selection = [];

    let premades = [
        assignmentChoose('e', 'What is E?', Math.E, rng(5, 1), rng(7, 2)),
        assignmentChoose('pi', 'What is pi?', Math.PI, rng(4, 1), rng(4, 1))
    ]

    selection.push(premades[rng(premades.length)]);

    ['-', '+', '/', '+', '*'].forEach((operator) => {
        selection.push(assignmentCalculate(operator));
    });


    selection = selection.concat(premades);

    return selection;

}

function assignmentChoose(id, prompt, correct, wrong1, wrong2){

    let options = [];
    let inserts = [wrong1, wrong2, correct];
    for (let i = 0; i < inserts.length; i++) {
        let correctLocation = rng(options.length + 1);
        options.splice(correctLocation, 0, inserts[i]);
    }

    return {
        choose: true,

        id: id,
        prompt: prompt,
        correct: correct,
        options: options
    }
}

export default class TwosRoute extends Route {
    @service router;
    @service menuService;

    params = Tracked({
        title: 'Get ready...',
        timer: 5,
    });
    timerInterval = 0;
    assignments = Tracked(assignments());

    
    @action
    minusTimer() {
        this.params.timer -= 1;
        if (this.params.timer <= 0) {
            clearInterval(this.timerInterval);
            document.getElementById('overlay').style.height = "100vh";

            later(this, function() {
                this.params.timer = 5;
                this.assignments = Tracked(assignments())
                this.refresh();
            }, 2000);
        }
    }



    model() {
        set(this, 'title', 'Get ready...');

        this.timer=4;
        
        later(() => {
            document.getElementById('overlay').style.height = "0vh";
            this.timerInterval = setInterval(this.minusTimer, 1000);
        }, 2000);

      

        return {
            'params': this.params,
            'assignments': this.assignments,
            'answer': this.answer,
        };
    }

    
    @action
    willTransition(transition) {
        clearInterval(this.timerInterval);
    }
    

    @action
    answer(e) {
        console.log(this.assignments)
        let clickedButton = e.target;
        let assignment = this.assignments.find((assignment) => assignment.id == clickedButton.className);

        if (assignment.correct == clickedButton.value) {
            console.log('right')
            console.log(this.timer);
            this.params.timer += 3;
            this.assignments.splice(this.assignments.indexOf(assignment), 1);
        } else {
            console.log('wrong')
            this.params.timer -= 3;

        }

        if (this.assignments.length == 0) {
            this.menuService.getKey('maxi');
            clearInterval(this.timerInterval);
        }
    }
    
}
