
// const hjson = require('hjson')

const AuthLib = '@adobe/aio-cli-plugin-auth'
const topicMap = {
  console: '@adobe/aio-cli-plugin-console',
  app: '@adobe/aio-cli-plugin-app',
  events: '@adobe/aio-cli-plugin-events',
  // runtime has an alias
  runtime: '@adobe/aio-cli-plugin-runtime',
  rt: '@adobe/aio-cli-plugin-runtime',
  // auth, login, logout, context, ctx
  auth: AuthLib,
  login: AuthLib,
  logout: AuthLib,
  context: AuthLib,
  ctx: AuthLib,
  //
  certificate: '@adobe/aio-cli-plugin-certificate',
  config: '@adobe/aio-cli-plugin-config',
  info: '@adobe/aio-cli-plugin-info'
}

module.exports = async function ({ id, config }) {
  // name, version
  if (Object.keys(topicMap).includes(id)) {
    // check that the app plugin is installed
    const pluginIds = config.plugins.map((plugin) => plugin.name)
    if (!pluginIds.includes(topicMap[id])) {
      console.log('plugin not found, installing it')
      await config.runCommand('plugins:install', [topicMap[id]])
    } else {
      // console.log('looks like it is already installed')
    }
  }
}
