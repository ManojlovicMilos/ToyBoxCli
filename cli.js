#!/usr/bin/env node

const commands = require('./cli/commands');

let [,, ...args] = process.argv;

let command = args[0];
let [, ...arguments] = args;

commands.parseCommand(command, arguments);
