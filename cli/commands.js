const project = require('./project');
const settings = require('./settings');

function parseCommand(command, arguments)
{
    if(command == 'version' || command == '-v')
    {
        console.info('ToyBox CLI ' + settings.version);
    }
    else if(command == 'start' || command == '-s')
    {
        project.start();
    }
    else if(command == 'init' || command == '-i')
    {
        project.init(arguments[0]);
    }
    else if(command == 'pack' || command == '-p')
    {
        project.pack();
    }
    else if(command == 'verbose')
    {
        settings.params.verbose = true;
        let [, ...newArguments] = arguments;
        parseCommand(arguments[0], newArguments);
    }
}

module.exports = { parseCommand };