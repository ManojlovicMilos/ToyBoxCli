const system = require('./system');
const settings = require('./settings');

function compress(paths, output, callback)
{
    if(settings.params.compression == '7zip') _compress7z(paths, output, callback);
    else if(settings.os == 'win') _compressWin(paths, output, callback);
    else _compressUnix(paths, output, callback);
}
function _compressWin(paths, output, callback)
{
    let params = ['Compress-Archive', '-Update', '-DestinationPath', output, '-Path'];
    _runCompress('powershell.exe', params, paths, callback, ',');
}
function _compress7z(paths, output, callback)
{
    let params = ['a', '-tzip', output];
    _runCompress(system.oscode('7z'), params, paths, callback);
}
function _compressUnix(paths, output, callback)
{
    let params = ['-r', output];
    _runCompress('zip', params, paths, callback);
}
function _runCompress(program, params, paths, callback, splitWith)
{
    _addPaths(params, paths, splitWith);
    system.run(program, params, callback, 'Compression failed: ');
}
function _addPaths(params, paths, splitWith = '')
{
    for(let i = 0; i < paths.length; i++)
    {
        let path = paths[i];
        if(i < paths.length - 1) path += splitWith;
        params.push(path);
    }
}

module.exports = { compress };