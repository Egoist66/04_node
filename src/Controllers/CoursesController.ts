import type {Express} from "express";
import {Courses} from "../Models/courses.ts";

export class CoursesController {
    static coursesPath = '/courses';


    public static index(app: Express): void {

        app.get(this.coursesPath, (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json(Courses);
        })


    }
}