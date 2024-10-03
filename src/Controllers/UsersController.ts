import type {Express} from "express";

export class UsersController {
    static usersPath = '/users';


    public static index(app: Express): void {

        app.get(this.usersPath, (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json([{name: 'John'}, {name: 'Jane'}, {url: req.url}]);
        })

        app.post('/users', (req, res) => {
            res.status(200).json({body: req.body});
        })
    }
}