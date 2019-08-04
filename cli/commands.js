const project = require('./project');
const settings = require('./settings');
const process = require('process');
const help = require('./help');

function parseCommands(arguments)
{
    let commands = [];
    for(let i = 0; i < arguments.length;)
    {
        if(!arguments[i].startsWith('-'))
        {
            console.error('Invalid syntax: "' + arguments[i] + '" is not properly formated ToyBox CLI command.');
            process.exit(6);
        }
        let command = arguments[i];
        let commandArguments = [];
        i++;
        for(; i < arguments.length; i++)
        {
            if(arguments[i].startsWith('-')) break;
            commandArguments.push(arguments[i]);
        }
        commands.push({ command, args: commandArguments });
    }
    for(let i = 0; i < commands.length; i++)
    {
        executeCommand(commands[i].command, commands[i].args);
    }
}
function executeCommand(command, arguments)
{
    if(command == '-version' || command == '-v')
    {
        console.info('ToyBox CLI ' + settings.version);
    }
    else if(command == '-start' || command == '-s')
    {
        project.start();
    }
    else if(command == '-init' || command == '-i')
    {
        if(arguments.length == 0)
        {
            console.error('Invalid syntax: Command "init" requires "name" argument');
            process.exit(10);
        } 
        project.init(arguments);
    }
    else if(command == '-deps' || command == '-d')
    {
        project.installDependencies();
    }
    else if(command == '-pack' || command == '-p')
    {
        project.pack();
    }
    else if(command == '-output' || command == '-o')
    {
        settings.params.verbose = true;
    }
    else if(command == '-7zip' || command == '-7')
    {
        settings.params.compression = '7zip';
    }
    else if(command == '-no' || command == '-n')
    {
        if(arguments.length == 0)
        {
            console.error('Invalid syntax: Missing argument for command "no".');
            process.exit(10);
        }
        if(arguments[0] == 'dependencies' || arguments[0] == 'deps')
        {
            settings.params.preinstallDependencies = false;
        }
        else
        {
            console.error('Invalid syntax: Invalid argument "' + arguments[0] + '" for command "no".');
            process.exit(11);
        }
    }
    else if(command == '-help' || command == '-h')
    {
        if(arguments.length > 0 && arguments[0] != 'details')
        {
            console.error('Invalid syntax: Invalid argument "' + arguments[0] + '" for command help.');
            process.exit(11);
        }
        help.outputHelp(arguments[0]);
    }
    else
    {
        console.error('Invalid syntax: "' + command + '" does not exist as ToyBox CLI command.');
        process.exit(8);
    }
}

module.exports = { parseCommands };