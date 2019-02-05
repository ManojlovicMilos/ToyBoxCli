const fs = require('fs')
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
    /*process.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    process.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
    });*/
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

module.exports = { make, rename, remove, read, write, runNpm, run };