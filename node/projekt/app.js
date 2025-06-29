const colors = require('colors');
const parseArgs = require('minimist');
const fs = require('fs');

const start = parseArgs(process.argv)
delete start._
console.log(start);

const handleStart = ({ add, remove, show, deadline }) => {
    if (add) {
        if (typeof add !== "string") {
            return console.log("Wpisz tekstową nazwę zadania.")
        }
        handleTasks("add", add, deadline)
    } else if (remove) {

    } else if (show || show === "") {
        handleTasks("show", null)
    } else {
        console.log("Nie rozumiem polecenia.".red)
    }
}

const handleTasks = (option, title, deadline = null) => {
    const data = fs.readFileSync('tasks.json');
    let tasks = JSON.parse(data)
    console.log(tasks);

    if (option == "add" || option == "remove") {
        const isExist = tasks.find(task => task.title === title) ? true : false;

        if (option == "add" && isExist) {
            return console.log("Zadanie juz istnieje.".red);
        } else if (option == 'remove' && !isExist) {
            return console.log("Zadanie nie istnieje.".red)
        }
    }

    switch(option) {
        case "add":
            tasks = tasks.map((task, index) => ({id: index + 1, title: task.title, deadline: task.deadline}));
            const id= tasks.length + 1;
            tasks.push({id, title, deadline});
            console.log(tasks);
            dataJSON = JSON.stringify(tasks);
            fs.writeFileSync('tasks.json', dataJSON);
            console.log(`Dodano zadnaie: ${title} z terminem: ${deadline || "bez terminu"}.`.white.bgGreen);
            break
        case "remove":
            break
        case "show":
            if (tasks.length > 0) {
                console.log(`Ilość zadań do zrobienia: ${tasks.length}.` .white.bgBlue);
                tasks.forEach(element => {
                    return console.log(`-${element.title.toLowerCase()} ${element.deadline ? `- termin: ${element.deadline}` : "-termin: brak"}`);
                });
            } else {
                console.log("Nie masz żadnych zadań do zrobienia.".black.bgYellow);
            }
            break
    }
}

handleStart(start)