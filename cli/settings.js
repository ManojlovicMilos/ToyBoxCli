const process = require('process');
let params = { verbose: false, compression: 'default', preinstallDependencies: true };
const version = '0.0.4';
const os = (process.platform === 'win32') ? 'win' : 'unix';
const repo = 'https://github.com/ManojlovicMilos/ToyBoxStarter.git';
const templatedFiles = ['.gitignore','index.html','LICENSE','package.json','README.md','webpack.config.js','Code/GameLogic.ts'];
const buildPaths = ['index.html','style.css','build','Resources'];

module.exports = { params, version, os, repo, templatedFiles, buildPaths };