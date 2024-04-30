import { StackContext, Api, Function } from "sst/constructs";
import {Code, LayerVersion} from "aws-cdk-lib/aws-lambda";

export function API({ stack }: StackContext) {


  const chromiumLayer = new LayerVersion(this, "chromiumLayer", {
    code: Code.fromAsset("layers/chromium"),
  });
  // OPTIONAL: Create your own layer beforehand and use it here
  // const layerArn = "arn:aws:lambda:<REGION>:<ACCOUNT>:layer:<LAYER-NAME>:<VERSION>";
  // const chromiumLayer = LayerVersion.fromLayerVersionArn(stack, "chromiumLayer", layerArn),

  const pdfGenerator = new Function(stack, 'pdfGenerator', {
    memorySize: 4096,
    architecture: "x86_64",
    timeout: 15,
    handler: "packages/functions/src/pdfGenerator.handler",
    nodejs: {
      install: ["@sparticuz/chromium"],
    },
    copyFiles: [{from: "./packages/core/pdfTemplates", to: "./templates"}],
    layers: [chromiumLayer],
  });

  const api = new Api(stack, "api", {
    routes: {
      "POST /gen": pdfGenerator
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
