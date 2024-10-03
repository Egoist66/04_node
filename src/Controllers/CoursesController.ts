import type {Express} from "express";
import {Courses} from "../Models/courses.ts";
import { BaseController } from "./BaseController.ts";

export class CoursesController extends BaseController {
    static baseUrl: string = '/courses';


    public static index(app: Express): void {

        app.get(this.baseUrl, (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json(Courses);
        })


    }
}