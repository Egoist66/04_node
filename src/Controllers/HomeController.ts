import type {Express} from "express";
import { BaseController } from "./BaseController";

export class HomeController extends BaseController {
    static baseUrl: string = '/';


    public static init(app: Express): void {
        this.index(app)
    }

    private static index(app: Express): void {
        app.get(this.baseUrl, (req, res) => {
            res.type('html');
            res.status(200).send('Home!!!!');
        })
    }
}