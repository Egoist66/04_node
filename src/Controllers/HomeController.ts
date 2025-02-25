import type {Express} from "express";
import { BaseController } from "./BaseController";
import { formParser } from "../app.ts";

export class HomeController extends BaseController {
    static baseUrl: string = '/';


    public static init(app: Express): void {
        this.index(app)
        this.post(app)
        
    }

    

    private static index(app: Express): void {
       app.get(this.baseUrl,(req, res) => {
            res.type('html');
            
            //res.status(200).send('<h1>Home</h1>');
           
        })
        
    }

    private static post(app: Express): void {
        app.post(this.baseUrl, formParser, (req, res) => {
            if(!req.body){
                res.sendStatus(400);
                return

            } 
            console.log(req.body);
            res.send(`${req.body.userName} - ${req.body.userAge}`).status(201);
        })
    }
}