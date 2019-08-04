const text = require('./text');
const system = require('./system');
const settings = require('./settings');
const process = require('process');

let _name = 'New Project';
let _description = 'New TBX Engine Project';
let _author = 'Unknown';

function apply(name, description, author)
{
    if(!!name && name.length > 0) _name = name;
    if(!!description && description.length > 0) _description = description;
    if(!!author && author.length > 0) _author = author;
    _applyOnFiles();
}
function _applyOnFiles()
{
    for(let i = 0; i < settings.templatedFiles.length; i++)
    {
        _replaceInFile(settings.templatedFiles[i]);
    }
}
function _replaceInFile(path)
{
    let data = system.read(path);
    data = text.replace(data, '[[Name]]', _name);
    data = text.replace(data, '[[NameCamel]]', text.camel(_name));
    data = text.replace(data, '[[NameKebab]]', text.kebab(_name));
    data = text.replace(data, '[[Description]]', _description);
    data = text.replace(data, '[[Author]]', _author);
    system.write(path, data);
}

module.exports = { apply };