import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "./schema.json",
  apiFile: "./src/app/baseApi.ts",
  apiImport: "baseSplitApi",
  outputFile: "./src/features/games/gameApi.ts",
  exportName: "gameApi",
  filterEndpoints: [/api/],
  hooks: true,
  tag: true,
  flattenArg: true,
};

export default config;
