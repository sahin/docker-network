#!/usr/bin/env node
/*
    ____                  _
  / ___|__ _  __ _  __ _| |_ __ _ _   _
 | |   / _` |/ _` |/ _` | __/ _` | | | |
 | |__| (_| | (_| | (_| | || (_| | |_| |
  \____\__,_|\__, |\__,_|\__\__,_|\__, |
             |___/                |___/

 Thursday, July 21, 2016 7:34 PM
 */
var exec = require('child_process').exec;
var updateNotifier = require('update-notifier');
var program = require('commander');
var pkg = require('./package.json');
updateNotifier({pkg}).notify();

program
  .option('-c, --container <string>', 'Docker container id')
  .parse(process.argv);



function ipFinder(containerId) {
  var cmd = `sudo docker inspect --format '{{ .NetworkSettings.IPAddress }}' ${containerId}`;

  exec(cmd, function(error, stdout, stderr) {
    console.log(stdout);
  });
}

if (program.container) {
  ipFinder(program.container);
} else {
  console.log('Please add container id \n Ex: dockerNetwork -c 12597ccd7f70');
}
