import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import gradient from "gradient-string";
import figlet from "figlet";
import { createSpinner } from 'nanospinner';
let playerName;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const rainbowTItle = chalkAnimation.rainbow(`Who wants to be a Typescript Millionare ? \n`);
    await sleep();
    rainbowTItle.stop();
    console.log(`
        ${chalk.bgBlue(`HOW TO PLAY`)}
        I am a process on your computer.
        If you get any question wrong I will be ${chalk.bgRed(`Killed`)}
        So get ll the question right ...
        `);
}
async function askName() {
    const answers = await inquirer.prompt([
        {
            name: 'player_name',
            type: 'input',
            message: 'What is your name ?',
            default() {
                return 'Player';
            }
        }
    ]);
    playerName = answers.player_name;
}
async function question1() {
    const answers = await inquirer.prompt([
        {
            name: 'question_1',
            type: 'list',
            message: 'Javascript was created in 10 days and then released on \n',
            choices: [
                'May 23rd, 1995',
                'Nov 24th, 1995',
                'Dec 4th, 1995',
                'Dec 17, 1996',
            ]
        }
    ]);
    return handleAnswer(answers.question_1 == 'Dec 17, 1996');
}
async function handleAnswer(isCorrect) {
    const spinner = createSpinner(`Checking answer ...`).start();
    await sleep();
    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName} . This is a legit answer` });
    }
    else {
        spinner.error({ text: `Game over, You lose ${playerName}! ` });
        process.exit(1);
    }
}
function winner() {
    console.clear();
    const msg = `Congrats, ${playerName}! \n 1 , 0 0 0 , 0 0 0`;
    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}
await welcome();
await askName();
await question1();
winner();
// both lines are correct
// await welcome()
// welcome 
