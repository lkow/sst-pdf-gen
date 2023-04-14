# Serverless HTML to PDF
This repo presents an example (and a base starting project template) of generating PDF files from HTML templates using:
* SST (https://sst.dev) for provisioning and deployment
* AWS Lambda (https://aws.amazon.com/lambda/) for serverless execution
* Pre-existing AWS Lambda Layer for `chrome-aws-lambda` (https://github.com/alixaxel/chrome-aws-lambda)
* Nunjucks (https://mozilla.github.io/nunjucks/) for HTML templating
* Puppeteer (https://pptr.dev) for final PDF generation

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
This example uses a pre-existing AWS Lambda Layer for `chrome-aws-lambda` and Puppeteer version which only work with Node v14 or lower (see note in `stacks/MyStack.ts:10`)
If you want to use a newer version of Node, you'll need to build your own AWS Lambda Layer for `chrome-aws-lambda` and Puppeteer
When going this route, you may use https://github.com/Sparticuz/chromium as a starting point for building and deploying your own AWS Lambda Layer
Remember to update the `stacks/MyStack.ts:10` to use the new layer, then bump the Puppeteer version accordingly