const system = require('./system');
const settings = require('./settings');
const template = require('./template');
const process = require('process');

let projectName = "NewProject";
function start()
{
    system.runNpm("start");
}
function init(name)
{
    if(!!name) projectName = name;
    system.run("git", ["clone", settings.repo], _cloneComplete,
        "Failed to clone TBX Starter repository. Check if you have git installed and have internet connection.");
}
function _cloneComplete()
{
    console.info("Clone Successfull.");
    system.rename('ToyBoxStarter', projectName);
    process.chdir(projectName);
    system.run("git", ["checkout", "-b", "cli"], _checkoutComplete,
        "Failed to checkout CLI branch. Check if you have internet connection.");
}
function _checkoutComplete()
{
    console.info("Checkout Successfull.");
    system.run("git", ["pull", "origin", "cli"], _pullComplete,
        "Failed to pull from CLI branch. Check if you have internet connection.");
}
function _pullComplete()
{
    console.info("Pull Successfull.");
    template.apply(projectName);
    console.info("Templating Finished.");
    system.remove(".git");
    system.run('npm.cmd', ['install'], _installComplete, "Failed to install dependencies, check if you have Node and NPM installed.");
}
function _installComplete()
{
    console.info("Install Successfull.");
    console.info("Project " + projectName + " is Ready!");
}

module.exports = { start, init };