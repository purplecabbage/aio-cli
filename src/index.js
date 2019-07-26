/*
 * Copyright 2019 Adobe Inc. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const { Command, run, flags } = require('@oclif/command')
const Config = require('@oclif/config')

class AIOCommand extends Command { }

function getFlagNamesFromArgs (argv) {
  let flagNames = argv.filter(elem => elem.indexOf('-') === 0)
  let cleanedNames = flagNames.map(elem => {
    return elem.replace('^-+', '')
  })
  return cleanedNames
}

AIOCommand.run = async (argv, opts) => {
  if (!argv) {
    argv = process.argv.slice(2)
  }

  // oclif originally included the following too ...
  // this resulted in an uncovered line in the tests, and it appeared to never happen anyway
  // seem like it would only
  // ||  module.parent && module.parent.parent && module.parent.parent.filename
  const config = await Config.load(opts || __dirname)

  let subCommand = argv[0]

  // 1. find the first flag ( note: there could be none ... )
  let firstFlag = argv.slice().findIndex(elem => elem.indexOf('-') === 0)
  if (firstFlag < 0) {
    firstFlag = argv.length
  }

  // 2. try to make the biggest topic command by combining with ':'
  // and looking up in this.config.commandIDs
  for (let x = firstFlag; x > -1; x--) {
    subCommand = argv.slice(0, x).join(':')
    // if (config.findTopic(subCommand)) { // <= this works but does not support aliases
    let foundCommand = config.findCommand(subCommand)
    // foundCommand defines static 'flags' prop
    if (foundCommand != null) {
      argv = [subCommand].concat(argv.slice(x))
      break
    }
  }

  // potentially there are global flags present, where we want specific action
  // but the command should be able to override our behavior

  // pull out any special flags
  let flagNames = getFlagNamesFromArgs(argv)
  console.log('flagNames', flagNames)
  if(flagNames.indexOf('--debug') > -1) {
    console.log('setting debug to be on ...')
    argv.splice(argv.indexOf('--debug'),1)
    process.env.DEBUG = '*'
  }

  // the second parameter is the root path to the CLI containing the command
  return run(argv, config.options)
}

AIOCommand.flags =  {
  temple: flags.string({
    char: 'n',
    description: 'let us see now ...',
    default: 'hmm'
  })
}

module.exports = AIOCommand
