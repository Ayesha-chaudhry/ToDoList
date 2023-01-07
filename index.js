import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
figlet('Todo List!', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.cyan(data));
});
let todoList = [];
async function repeatFlow() {
    const answer = await inquirer.prompt([{
            name: 'repeat',
            type: 'list',
            choices: ['Yes', 'No'],
            message: 'Do You want another operation'
        }]);
    return (answer.repeat === "Yes") ? true : false;
}
async function toDoList() {
    let startAgain = true;
    do {
        const answer = await inquirer.prompt([{
                name: 'option',
                type: 'list',
                choices: ['Add Item', 'Display', 'Remove Item'],
                message: 'What you want to do?'
            }]);
        if (answer.option == 'Add Item') {
            const item = await inquirer.prompt([{
                    name: 'newItem',
                    type: 'input',
                    message: 'Enter new Item'
                }]);
            todoList.push(item.newItem);
            startAgain = await repeatFlow();
        }
        else if (answer.option == 'Display') {
            if (todoList.length == 0) {
                console.log(chalk.red("Your list is empty"));
            }
            todoList.forEach(ele => console.log(ele));
            startAgain = await repeatFlow();
        }
        else if (answer.option == 'Remove Item') {
            if (todoList.length == 0) {
                console.log(chalk.red("Your List is already empty"));
            }
            const removeItem = await inquirer.prompt([{
                    name: "item",
                    type: 'input',
                    message: 'Which item you want to remove'
                }]);
            let index = todoList.indexOf(removeItem.item);
            console.log(index);
            if (index !== -1) {
                todoList.splice(index, 1);
            }
            startAgain = await repeatFlow();
        }
    } while (startAgain !== false);
}
;
setTimeout(() => {
    toDoList();
}, 1000);
