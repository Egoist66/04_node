import express, { Express } from "express";
import { logger } from "../src/middlewares/logger";


import config from './server.config.json'

/**
 * @description
 * Sets up an express app with a static route to the public folder, parses json and logs requests.
 * @returns {Object} - An object containing the express app, a config object with a port property,
 * setPort function to set the port and a listen function to start the server on a given port.
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
   * @description
   * Listens to the server on a given port, and logs the server url in the console.
   * @param {number} port - The port to listen to.
   */
  const listen = (port: number) => {
    app.listen(port, () =>
      console.log(`Server is running on ${config.server.protocol}://${config.server.host}:${port}`)
    );
  };

  return { app, config,  listen };
}
