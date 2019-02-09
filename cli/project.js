const system = require('./system');
const settings = require('./settings');
const template = require('./template');
const compress = require('./compress');
const process = require('process');

let projectName = 'NewProject';
function start()
{
    settings.params.verbose = true;
    system.runNpm('start');
}
function pack()
{
    compress.compress(settings.buildPaths, 'build.zip', _compressComplete);
}
function _compressComplete()
{
    console.info('Build packaging complete!');
}
function init(name)
{
    if(!!name) projectName = name;
    console.info('Cloning template repository..');
    system.run('git', ['clone', settings.repo], _cloneComplete,
        'Failed to clone TBX Starter repository. Check if you have git installed and have internet connection: ');
}
function _cloneComplete()
{
    console.info('Checking out desired template type..');
    system.rename('ToyBoxStarter', projectName);
    process.chdir(projectName);
    system.run('git', ['checkout', '-b', 'cli'], _checkoutComplete,
        'Failed to checkout CLI branch. Check if you have internet connection: ');
}
function _checkoutComplete()
{
    console.info('Getting latest changes..');
    system.run('git', ['pull', 'origin', 'cli'], _pullComplete,
        'Failed to pull from CLI branch. Check if you have internet connection: ');
}
function _pullComplete()
{
    console.info('Applying variables to template..');
    template.apply(projectName);
    system.remove('.git');
    console.info('Installing dependencies..');
    system.run(system.oscode('npm'), ['install'], _installComplete, 'Failed to install dependencies, check if you have Node and NPM installed: ');
}
function _installComplete()
{
    console.info('Project ' + projectName + ' is Ready!');
}

module.exports = { start, init, pack };