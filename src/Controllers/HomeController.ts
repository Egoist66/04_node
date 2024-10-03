import type {Express} from "express";

export class HomeController {
    static homePath = '/';


    public static index(app: Express): void {
        app.get(this.homePath, (req, res) => {
            res.type('html');
            res.status(200).send('Home!!!!');
        })
    }
}