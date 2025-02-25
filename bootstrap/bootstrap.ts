import express, { Express } from "express";
import { logger } from "../middlewares/logger";


import config from './server.config.json'



/**
 * Bootstraps the express app and returns it along with the server configuration and a listen function.
 * @returns {Object} - An object containing the express app, the server configuration, a listen function.
 */
export function bootstrapApp(): {
  app: Express;
  config: typeof config;
  urlEncodedParser: (req: any, res: any, next: any) => void;
  listen: (port: number) => void;
} {
  const app = express();

  const urlEncodedParser = express.urlencoded({ extended: false });
  
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

  return { app, config,  listen, urlEncodedParser };
}
