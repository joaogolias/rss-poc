import * as fs from "fs";

fs.writeFileSync("Procfile",
  process.env.STACK === "front" ?
    'web: yarn start:backend'
  : 'web: yarn start:backend'
)