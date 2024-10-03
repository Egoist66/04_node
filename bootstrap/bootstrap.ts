import express, {Express} from 'express';
import {logger} from "../src/middlewares/logger";


/**
 * @description
 * Sets up an express app with a static route to the public folder, parses json and logs requests.
 * @returns {Object} - An object containing the express app, a config object with a port property,
 * setPort function to set the port and a listen function to start the server on a given port.
 */
export function bootstrapApp(): {app: Express, config: {port: number}, setPort: (PORT: number) => {port: number}, listen: (port: number) => void} {
    const app = express();
    const config = {
        port: 3003
    }

    app.use('/', express.static('public'));
    app.use(express.json());
    app.use(logger)


    /**
     * @description
     * Sets the port number for the server.
     * @param {number} PORT - The port number to set.
     * @returns {Object} - The config object with the new port number.
     */
    const setPort = (PORT: number) => {
      config.port = PORT
      return config
    }

    /**
     * @description
     * Listens to the server on a given port, and logs the server url in the console.
     * @param {number} port - The port to listen to.
     */
    const listen = (port: number) => {
        app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
    }

    return {app, config, setPort, listen}
}