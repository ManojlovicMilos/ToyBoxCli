function outputHelp(details)
{
    console.info('You call ToyBox CLI as follows:');
    console.info('tbx -command [arguments] -command [arguments] ..');
    console.info('');
    console.info('ToyBox CLI Commands:');
    if(details) console.info('');
    console.info('-init (-i) project_name (project_description) (project_author)');
    if(details) 
    {
        console.info('Creates new project folder.');
        console.info('You need to have git installed on your system.');
        console.info('You need to have npm installed on your system.');
        console.info('Arguments:');
        console.info('project_name: Name for your new project.');
        console.info('project_description: Describe your new project.');
        console.info('project_author: Your name.');
        console.info('Examples:');
        console.info('tbx -init MyNewProject');
        console.info('tbx -i "My New Project"');
        console.info('');
    }
    console.info('-start (-s)');
    if(details) 
    {
        console.info('Runs project in current folder.');
        console.info('Output for this command is enabled by default.');
        console.info('You need to have npm installed on your system.');
        console.info('Examples:');
        console.info('tbx -start');
        console.info('tbx -s');
        console.info('');
    }
    console.info('-pack (-p)');
    if(details) 
    {
        console.info('Packs release version of project for publish.');
        console.info('Examples:');
        console.info('tbx -pack');
        console.info('tbx -p');
        console.info('');
    }
    console.info('-help (-h) (details)');
    if(details) 
    {
        console.info('Help ypu are seeing right now.');
        console.info('Arguments:');
        console.info('details: Show additional details such as Arguments and Examples.');
        console.info('Examples:');
        console.info('tbx -help');
        console.info('tbx -h');
        console.info('');
    }
    console.info('-version (-v)');
    if(details) 
    {
        console.info('Display TBX-CLI version.');
        console.info('Examples:');
        console.info('tbx -version');
        console.info('tbx -v');
        console.info('');
    }
    console.info('-output (-o) //Flag');
    if(details) 
    {
        console.info('Flag: Enables complete console output.');
        console.info('Examples:');
        console.info('tbx -output -init NewProject');
        console.info('tbx -o -p');
        console.info('');
    }
    console.info('-7zip (-7) //Flag');
    if(details) 
    {
        console.info('Use 7zip packager instead of system packager.');
        console.info('You need to have 7zip installed on your system.');
        console.info('Examples:');
        console.info('tbx -7zip -pack');
        console.info('tbx -7 -p');
        console.info('');
    }
    else
    {
        console.info('[Add details argument with help for more information about commands.]');
    }
} 

module.exports = { outputHelp };