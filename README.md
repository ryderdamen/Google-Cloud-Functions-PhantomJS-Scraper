# PhantomJS Scraper - Google Cloud Function
A Google Cloud Function written in Node that retrieves a website with PhantomJS. This function is designed as a proxy for when you need rendered HTML in an environment that does not support PhantomJS.

## Installation
Installation is relatively easy.

First, run the installation script

```bash
make install
```

Next, change the name of `src/keysExample.js` to `src/keys.js` and replace the value for `accessToken`.
It's up to you what you choose, but it will need to be in the post request body as the value for `key`.

```bash
cd src
mv keysExample.js keys.js
nano keys.js
```

### Testing Locally
Confirm everything was installed correctly

```bash
make test
```

### Dependencies
* Node (see package.json)
    * phantomjs-prebuilt
    * webdriverio
* Other
    * gcloud CLI tool
    * GCP Account with Functions enabled

## Deployment
Deployment is more or less easy. Execute the following command, and enter your gcloud project name.

```bash
make deploy
```

### Testing on Google Cloud
In your cloud console there is a nice testing module. Once your function is successfully deployed, try placing this in the `Triggering Event` box:

```json
{
	"key": "Your Secret Key",
	"url": "https://developer.mozilla.org/en-US/"
}
```

## Usage
To use in production, simply make a POST request to your endpoint in Cloud Functions, with the following parameters in the request body:
```json
{
	"key": "Your Secret Key",
	"url": "https://developer.mozilla.org/en-US/"
}
```

### Timeouts
Sometimes a page requires waiting a bit longer for all the elements to load. In this case, simply add a timeout in milliseconds to your post request. This request will wait 3 seconds after the document is ready before returning the source.

```json
{
    "key": "Your Secret Key",
    "url": "https://developer.mozilla.org/en-US/",
    "timeout": "3000"
}
```

If the Output displays HTML, you are good to go.

## Contributions
Contributions are welcome. Feel free to fork and submit a PR.