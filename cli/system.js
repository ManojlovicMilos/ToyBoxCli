const fs = require('fs');
const path = require('path');
const settings = require('./settings');
const { spawn } = require('child_process');

function make(path)
{
    try
    {
        fs.mkdirSync(path)
    }
    catch (err)
    {
        if (err.code !== 'EEXIST') console.warn("Directory " + path + " already exists");
    }
}
function rename(path, newPath)
{
    try
    {
        fs.renameSync(path, newPath);
    }
    catch (err)
    {
        console.error("Directory failed to rename: " + err);
    }
}
function remove(path)
{
    if (fs.existsSync(path))
    {
        fs.readdirSync(path).forEach(function(file, index)
        {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory())
            {
                remove(curPath);
            }
            else
            {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}
function copy(source, target)
{
    if(fs.lstatSync(source).isDirectory())
    {
        _copyFolder(source, target);
    }
    else _copyFile(source, target);
}
function _copyFile(source, target)
{
    var targetFile = target;
    if(fs.existsSync(target))
    {
        if(fs.lstatSync(target).isDirectory())
        {
            targetFile = path.join(target, path.basename(source));
        }
    }
    fs.writeFileSync(targetFile, fs.readFileSync(source));
}
function _copyFolder( source, target )
{
    var files = [];
    var targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder))
    {
        fs.mkdirSync(targetFolder);
    }
    if (fs.lstatSync(source).isDirectory())
    {
        files = fs.readdirSync( source );
        files.forEach(function(file)
        {
            var curSource = path.join(source, file);
            if (fs.lstatSync( curSource ).isDirectory())
            {
                _copyFolder(curSource, targetFolder);
            }
            else
            {
                _copyFile( curSource, targetFolder );
            }
        });
    }
}
function read(path)
{
    return fs.readFileSync(path, 'utf8');
}
function write(path, data)
{
    fs.writeFileSync(path, data);
}
function runNpm(command, callback)
{
    run("npm.cmd", ["run", command], callback, "Command 'npm " + command + "' failed with code: ");
}
function run(command, arguments, callback, errorMessage)
{
    process = spawn(command, arguments);
    if(settings.params.verbose)
    {
        process.stdout.on('data', (data) => { console.info(`${data}`); });
        process.stderr.on('data', (data) => { console.error(`${data}`); });
    }
    process.on('close', function(code) {
        if(code == 0 && !!callback) callback();
        else if(code != 0)
        {
            if(errorMessage) console.error(errorMessage + code);
            else
            {
                console.error("Command '" + command + "' failed with code: " + code);
            }
        }
    }.bind(this));
}

module.exports = { make, rename, remove, copy, read, write, runNpm, run };