/** index.js
 * 
 * This function uses phantomjs-prebuilt to load a
 * js-based website and return plain HTML
 * 
 * @author Ryder Damen | ryderdamen.com
 */

const phantomjs = require('phantomjs-prebuilt')
const webdriverio = require('webdriverio')
const keys = require('./keys.js')

/** Checks the user is authorized, returns unauthorized if not
 * 
 * @param {*} req  Request object from GCF
 * @param {*} res  Response object from GCF
 * @since 1.0.0
 */
function checkAuthorization(req, res) {
  if ( req.body.key !== keys.accessToken ) {
    res.send('Unauthorized')
  }
}


/** Loads the URL provided with phantomJS and returns the result
 * 
 * @param {*} url  URL to load
 * @param {*} res  Response object from GCF
 * @since 1.0.0
 */
function loadWithPhantomJs(req, res) {
  var url = req.body.url
  var waitUntilTimeout = 0
  var phantomArgs = ['--webdriver=4444']
  if (req.body.hasOwnProperty('timeout')) {
    waitUntilTimeout = parseInt(req.body.timeout)
  }
  if (req.body.hasOwnProperty('insecure')) {
    phantomArgs = phantomArgs.concat([
      '--ignore-ssl-errors=true',
      '--web-security=false',
      '--ssl-protocol=any'
    ])
  }
  var webdriverSettings = {
    desiredCapabilities: {
      browserName: 'phantomjs'
    }
  }
  return phantomjs.run.apply(this, phantomArgs).then(driver => {
    let client = webdriverio.remote(webdriverSettings)
    return client.init().url(url).pause(waitUntilTimeout).getSource().then( source => {
        res.send(source)
        driver.kill()
      }).catch (error => {
        console.log(error);
      });
  })
}


/** Exports main logic for HTTP interface
 * 
 * @param {*} req  Request object from GCF
 * @param {*} res  Response object from GCF
 * @since 1.0.0
 */
exports.main = (req, res) => {
  checkAuthorization(req, res)
  return loadWithPhantomJs(req, res)
}
