import { createServer } from "node:http";

import { createApp } from "./src/app.js";
import { env } from "./src/config/env.js";
import { logger } from "./src/utils/logger.js";

const app = createApp();
const httpServer = createServer(app);

httpServer.listen(env.PORT, () => {
  logger.info({ port: env.PORT }, "vyapari-api listening");
});
