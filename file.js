const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
    .name('Todo')
    .description('list of commands for a todo cli app')
    .version('0.8.0')

program.command('add')
    .description('a cli command add task in json file')
    .argument('<string>','string to add in file')
    .action(() => {
        let filePath = './task.json';
        if(!fs.existsSync(filePath)){
            fs.writeFileSync(filePath,'[]');

            const data = fs.readFileSync(filePath,'utf-8');
            const todos = JSON.parse(data);
            const newTask = {id: todos.length + 1, task:process.argv[3], status:false}
            todos.push(newTask);
            fs.writeFileSync(filePath,JSON.stringify(todos,null,2));
        } 
        else{
            const data = fs.readFileSync(filePath,'utf-8');
            const todos = JSON.parse(data);
            const newTask = {id: todos.length + 1, task:process.argv[3], status:false}
            todos.push(newTask);
            fs.writeFileSync(filePath,JSON.stringify(todos,null,2));
        }
    });

program.command('delete')
    .description('a command to delete task from json file')
    .argument('id','id of task you want to delete')
    .action(() => {
        let filePath = './task.json'
        let data = fs.readFileSync(filePath,'utf-8');
        let todos = JSON.parse(data);
        const index = parseInt(process.argv[3]);
        for(let i=0; i<todos.length; i++ ){
            if(todos[i].id === index){
                todos.splice(i,1);
                todos.forEach((todo,index) => {
                    todo.id = index+1;
                });

            }
        }
        fs.writeFileSync(filePath,JSON.stringify(todos,null,2))
    })


program.command('done')
    .description('a command to mark that the task is done')
    .argument('<id>','id for task you want to mark done')
    .action(() => {
        const filePath = './task.json';
        const data = fs.readFileSync(filePath,'utf-8');
        const todos = JSON.parse(data)
        const index = parseInt(process.argv[3]);
        for(let i=0; i<todos.length; i++){
            if(todos[i].id === index){
                todos[i].status = true;
            }
        }
        fs.writeFileSync(filePath,JSON.stringify(todos,null,2))
    })

program.command('list')
    .description('a command to list all the tasks')
    .action(() => {
        const filePath = './task.json';
        const data = fs.readFileSync(filePath,'utf-8')
        const todos = JSON.parse(data);
        for(let i=0; i<todos.length; i++){
            console.log(todos[i].task);
        };
        fs.writeFileSync(filePath,JSON.stringify(todos,null,2))
    });
program.parse();