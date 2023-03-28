import { ApiHandler } from "sst/node/api";
import { PDF } from "@sstPdfGen/core/pdf";

export const handler = ApiHandler(async (_evt) => {
  return await PDF.generate();
});
