import { StackContext, Api, Function } from "sst/constructs";
import {LayerVersion} from "aws-cdk-lib/aws-lambda";

export function API({ stack }: StackContext) {

  const layerArn = "arn:aws:lambda:eu-central-1:764866452798:layer:chrome-aws-lambda:31";
  const pdfGenerator = new Function(stack, 'pdfGenerator', {
    memorySize: 4096,
    architecture: "x86_64",
    runtime: "nodejs14.x", // FIXME: `chrome-aws-lambda` layer only supports AWS Node Runtime up to 14.x., find an alternative to move to Node18.x
    timeout: 15,
    handler: "packages/functions/src/pdfGenerator.handler",
    nodejs: {
      install: ["chrome-aws-lambda"],
    },
    copyFiles: [{from: "./packages/core/pdfTemplates", to: "./templates"}],
    layers: [
      LayerVersion.fromLayerVersionArn(stack, "ChromeLayer", layerArn),
    ],
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
