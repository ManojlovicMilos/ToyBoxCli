const text = require('./text');
const system = require('./system');
const settings = require('./settings');
const process = require('process');
const readlineSync = require('./readline/readline.js');

let _name = "New Project";
let _description = "New TBX Engine Project";
let _author = "Unknown";

function apply(name)
{
    if(!!name) _name = name;
    process.stdin.isTTY = process.stdout.isTTY = true;
    var newDescription = readlineSync.question('How do you describe your game? ');
    if(!!newDescription && newDescription.length > 0) _description = newDescription;
    var newAuthor = readlineSync.question('Who are you? ');
    if(!!newAuthor && newAuthor.length > 0) _author = newAuthor;
    _applyOnFiles();
}
function _applyOnFiles()
{
    for(let i = 0; i < settings.files.length; i++)
    {
        _replaceInFile(settings.files[i]);
    }
}
function _replaceInFile(path)
{
    let data = system.read(path);
    data = text.replace(data, "[[Name]]", _name);
    data = text.replace(data, "[[NameCamel]]", text.camel(_name));
    data = text.replace(data, "[[NameKebab]]", text.kebab(_name));
    data = text.replace(data, "[[Description]]", _description);
    data = text.replace(data, "[[Author]]", _author);
    system.write(path, data);
}

module.exports = { apply };