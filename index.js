const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(questionText, resolve);
    });
}
/////////state machine
let states = {
    '182main': { canChangeTo: ['foyer', 'muddy waters', 'nectars'] },
    'foyer': { canChangeTo: ['182main', 'classroom'] },
    'classroom': { canChangeTo: ['foyer'] },
    'muddy waters': { canChangeTo: ['182main'] }
};

function enterState(newState) {
    let validTransitions = states[currentState].canChangeTo;
    if (validTransitions.includes(newState)) {
        currentState = newState;
    } else {
        console.log("Sorry, you can't go there directly from here.")
        return this;
    }
}
////////end state machine

let currentState = "182main";
start();

async function start() {
    const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.\n`;
    let answer = await ask(welcomeMessage);
    for (; answer;) {
        if (answer.toLowerCase() === "open door") {
            answer = await ask("The door is locked. There is a keypad on the door handle.\n");
        }
        else if (answer.toLowerCase() === "take sign")
            answer = await ask("That would be selfish. How will other students find their way?\n");
        else if (answer.toLowerCase() !== "read sign") {
            answer = await ask('Sorry, I don\'t understand "' + answer + '."\n');
        }
        else {
            sign();
            break;
        }
    }
}

async function sign() {
    let signText = 'The sign says "Welcome to Burlington Code Academy! Come on up\nto the third floor. If the door is locked, use the code 12345."\n';
    let answer = await ask(signText);
    for (; answer;) {
        if (answer.toLowerCase().includes("take") && answer.toLowerCase().includes("sign")) {
            answer = await ask("That would be selfish. How will other students find their way?\n");
        }
        else if (answer.toLowerCase().includes("enter code ") && !answer.toLowerCase().includes("12345")) {
            answer = await ask("Bzzzzt! The door is still locked.\n")
        }
        else if (answer.toLowerCase() !== "enter code 12345") {
            answer = await ask('Sorry, I don\'t understand "' + answer + '."\n');
        }
        else {
            console.log("Success! The door opens. \nYou enter the foyer and the door shuts behind you.");
            enterState("foyer");
            enter()
            break;
        }
    }

}

async function enter() {
    let foyerDesc = "You are in a foyer. A copy of Seven Days lies in a corner.\n"
    let answer = await ask(foyerDesc);
    let inventory = []
    for (; answer;) {
        if (answer.toLowerCase().includes("take") && answer.toLowerCase().includes("seven days")) {
            answer = await ask("You pick up the paper and leaf through it.\n")
            inventory.push("newspaper");
        }
        else if (answer.toLowerCase().includes("drop") && answer.toLowerCase().includes("seven days")) {
            answer = await ask("There will be another one next week anyway.\n")
            inventory.pop("newspaper");
        }
        else if (answer.toLowerCase() === "inventory") {
            answer = await ask("You are carrying: " + inventory + "\n");
        }
        else if (answer.toLowerCase().includes("read") && answer.toLowerCase().includes("paper")) {
            answer = await ask("Looks like another special on weed.\n")
        }
        else if (!answer.toLowerCase().includes("upstairs") && !answer.toLowerCase().includes("classroom")) {
            answer = await ask('Sorry, I don\'t understand "' + answer + '."\n');
        }
        else {
                enterState("classroom");
                classroom();
                break;
            }
        }


    }

    function classroom() {
        break;
    }

//
//
//
//
//
//
//



//class Burlington {
//    constructor()
//}