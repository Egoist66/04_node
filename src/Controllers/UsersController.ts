import type {Express} from "express";
import { BaseController } from "./BaseController";

export class UsersController extends BaseController {
    static baseUrl: string = '/users';

    public static init(app: Express): void {
        this.index(app);
        this.post(app);
    }

    private static index(app: Express): void {


        app.get(this.baseUrl, (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json([{name: 'John'}, {name: 'Jane'}, {url: req.url}]);
        })

        
    }

    private static post(app: Express): void {
        
        app.post(this.baseUrl, (req, res) => {
            res.status(200).json({body: req.body});
        })
    }
}

