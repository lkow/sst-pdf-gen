# Serverless HTML to PDF
This repo presents an example (and a base starting project template) of generating PDF files from HTML templates using:
* SST (https://sst.dev) for provisioning and deployment
* AWS Lambda (https://aws.amazon.com/lambda/) for serverless execution
* Puppeteer (https://pptr.dev) for final PDF generation
* Creating your own AWS Lambda Layer from `@sparticuz/chromium` release, that should be selected based on Puppeteer version used (https://github.com/Sparticuz/chromium/releases/) - for compatibility read https://pptr.dev/supported-browsers
* Nunjucks (https://mozilla.github.io/nunjucks/) for HTML templating


## Prerequisites
* Node.JS v16.16.0+
* _(Optional)_ NVM for easy Node version switch/management
* npm v8.15.0+
*  AWS Toolkit extension for your IDE
* `npm install` in root to pull currently supported version of SST and related packages

## Getting Started
* Run `npm run deploy` to deploy the stack to the default stage and provision all required infrastructure - this step is recommended whenever you're using AWS SQS (SST dev increases lambdas' timeouts which will make your queue provisioning throw an exception when it hits consumer)
* Run `npm run dev` to start local development and hot-reloading
* Have fun

## Important notes
This example uses a pre-built release of `@sparticuz/chromium` to create a new Lambda Layer on demand.
If you wish to lower your repo size you may decide to externally deploy the layer and later reference it in your stack.
Remember to update the `stacks/MyStack.ts:10` to use the new layer, then bump the Puppeteer version accordingly