const fs = require('fs')
const co = require('co')
const path = require('path')
const root = require('config').root
import connection from '../apollo/libs/connection'
import loadModels from '../apollo/libs/loadModels'
const clearDatabase = require('../apollo/libs/clearDatabase')

console.log(loadModels, '--- loadModels')

module.exports = function() {

  return co(async function() {

    const args = require('yargs')
      .usage("gulp db:load --from fixture/init")
      .demand(['from'])
      .describe('from', 'file to import')
      .argv

    const dbPath = path.join(root, args.from)

    // console.log("loading db " + dbPath)

    // await clearDatabase();
    await loadModels(require(dbPath))

    // console.log("loaded db " + dbPath)

    connection.disconnect()
  })

}
