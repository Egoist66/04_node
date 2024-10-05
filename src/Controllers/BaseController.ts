import type {Express} from 'express';


/**
 *
 *
 * @export
 * @abstract
 * @class BaseController
 * @description Base controller class. Must be extended by each controller.
 */
export abstract class BaseController {
    static baseUrl: string;


 
    /**
     * Initializes the controller by adding its routes to the Express app.
     * This method must be implemented by each controller.
     * @param {Express} app - The Express app to add the routes to.
     */
    public static init(app: Express): void {
        throw new Error('Method not implemented.');
    }
}