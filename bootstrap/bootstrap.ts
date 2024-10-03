import express, { Express } from "express";
import { logger } from "../src/middlewares/logger";


import config from './server.config.json'


/**
 * Bootstraps an express app with some default settings and middleware and returns it along with the server config and a function to listen to the server on a given port.
 * @returns { { app: Express; config: server.config.json; listen: (port: number) => void; } }
 */
export function bootstrapApp(): {
  app: Express;
  config: typeof config;
  listen: (port: number) => void;
} {
  const app = express();
  
  app.use("/", express.static("public"));
  app.use(express.json());
  app.use(logger);

 


  /**
   * Starts the express app and listens on the given port.
   * @param {number} port - The port to listen on.
   * @returns {void}
   */
  const listen = (port: number) => {
    app.listen(port, () =>
      console.log(`Server is running on ${config.server.protocol}://${config.server.host}:${port}`)
    );
  };

  return { app, config,  listen };
}
