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

const { Command, flags } = require('@oclif/command')
const { cli } = require('cli-ux')

const fetch = require('node-fetch')
const { URLSearchParams } = require('url')
const inquirer = require('inquirer')

class FeedbackCommand extends Command {

  async run () {
    
    //return cli.open(this.config.errlog)

    //return cli.open(this.config.pjson.bugs)

    //return cli.open(this.config.pjson.feedbackForum)

    inquirer.prompt([{
      name: 'name',
      message: 'What is your name?',
      type: 'string'
    }, {
      name: 'message',
      message: 'What would you like to tell the team?',
      type: 'string'
    }])
      .then(response => {
        // console.log('response = ', response)
        const params = new URLSearchParams()
        params.append('entry.2955400', response.name)
        params.append('entry.2734402', response.message)
        params.append('id', 'mG61Hd')

        fetch('https://docs.google.com/forms/d/e/1FAIpQLSdbRaK00Oo2ESXqcNU01p2Sg0eCrkjFNtxAbDpwrv3h6Xc5SQ/formResponse',
          { method: 'POST', body: params })
          .then(res => {
            this.log(res.ok ? 'ok' : 'Oops, something went wrong, you may need to try again later.')
            this.log(`Thank you for your feedback ${response.name} `)

            // console.log(res.status);
            // console.log(res.statusText);
            // console.log(res.headers.raw());
            // console.log(res.headers.get('content-type'));
          })
      })




    // entry.2955400: Jesse
    // entry.2734402: Still like it.

    // "https://docs.google.com/forms/d/e/1FAIpQLSdbRaK00Oo2ESXqcNU01p2Sg0eCrkjFNtxAbDpwrv3h6Xc5SQ/formResponse" 
    // target="_self" 
    // method="POST" id="mG61Hd">

    // fetch('https://github.com/')
    //   .then(res => {
    //       console.log(res.ok);
    //       console.log(res.status);
    //       console.log(res.statusText);
    //       console.log(res.headers.raw());
    //       console.log(res.headers.get('content-type'));
    //   })

  }
}

FeedbackCommand.description = `Tell the developers what you think!

The feedback command will open a browser window where you can post some information
`

// FeedbackCommand.aliases = []
// FeedbackCommand.flags = {}

module.exports = FeedbackCommand
