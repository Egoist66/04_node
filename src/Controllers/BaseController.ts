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
     * Sets up the routes for the controller. This method must be called for each controller.
     * @param {Express} app - The express app to set up the routes on.
     */
    public static index(app: Express): void {
        throw new Error('Method not implemented.');
    }
}