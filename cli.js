#!/usr/bin/env node

const commands = require('./cli/commands');
let [,, ...arguments] = process.argv;
commands.parseCommands(arguments);
