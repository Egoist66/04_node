import type { Express } from "express";
import { db } from "../Models/db.ts";
import { BaseController } from "./BaseController.ts";
import { findByQueryOrNone, findOrNone } from "../utils/utils.ts";

type Courses = typeof db.courses;
type SingleCourse = Courses['back-end']


export class CoursesController extends BaseController {
  static baseUrl: string = "/courses";


  public static init(app: Express): void {
    this.index(app)
    this.post(app)
  }

  private static index(app: Express): void {
    app.get(this.baseUrl, (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.type("json");


      if (req.query.title) {


        const coursesByTitle = findByQueryOrNone<SingleCourse[]>(db.courses, req.query.title);

        if(coursesByTitle && coursesByTitle.length > 0) {
            res.status(200).send({data: coursesByTitle});
            return;
        }
    
        res.status(200).send({
          message: `Course with title:${req.query.title} not found`,
          data: []
        });
          
        
      
      }
      else {
        res.send({data:db.courses});
        res.sendStatus(200);
      }
 


     
    });

    app.get(`${this.baseUrl}/:id`, (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.type("json");

   

      const course = findOrNone<{ title: string; id: number }>(
        db.courses,
        "id",
        +req.params.id
      );

      if (course) {
        res.status(200).send(course);

        return;
      }

      res.type("json");
      res
        .status(404)
        .send({ message: `Course with id:${req.params.id} not found` });
    });
  }

  private static post(app: Express): void {
    
    app.post(this.baseUrl, (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.type("json");
      res.status(200).send(req.body);
    });
  }
}
