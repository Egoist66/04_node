import type { Express } from "express";
import { db } from "../Models/db.ts";
import { BaseController } from "./BaseController.ts";
import { findByQueryOrNone, findOrNone } from "../utils/utils.ts";
import { httpStatusCodes } from "../addons/http.statuses.ts";

type Courses = typeof db.courses;
type KCourses = keyof typeof db.courses;
type SingleCourse = Courses["back-end"];

export class CoursesController extends BaseController {
  static baseUrl: string = "/courses";

  public static init(app: Express): void {
    this.index(app);
    this.post(app);
    this.delete(app);
    this.put(app);
  }

  /**
   * @description
   * Returns all courses if no query parameter is specified.
   * If query parameter "title" is specified, returns courses with titles matching the parameter.
   * If query parameter "course" and "id" are specified, returns a single course with the specified id.
   * @param {Express} app
   */
  private static index(app: Express): void {
    app.get(this.baseUrl, (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.type("json");

      if (req.query.title) {
        const coursesByTitle = findByQueryOrNone<SingleCourse[]>(
          db.courses,
          req.query.title
        );

        if (coursesByTitle && coursesByTitle.length > 0) {
          res.status(200).json({ data: coursesByTitle });
          return;
        }

        res.status(200).json({
          message: `Course with title:${req.query.title} not found`,
          data: [],
        });
      } else {
        res.status(200).json({ data: db.courses });
      }
    });

    app.get(`${this.baseUrl}/:course/:id`, (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.type("json");

      const course = findOrNone<{ title: string; id: number }>(
        db.courses[req.params.course as unknown as keyof typeof db.courses],
        "id",
        +req.params.id
      );

      if (course) {
        res.status(200).json(course);

        return;
      }

      res.type("json");
      res
        .status(404)
        .json({ message: `Course with id:${req.params.id} not found` });
    });
  }

  /**
   * Create a new course and add it to the database.
   * @param app The express app.
   * @returns void
   */

  private static post(app: Express): void {
    app.post(this.baseUrl, (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.type("json");

      if (req.body.title && req.body.course) {
        if (req.body.course === "front-end") {
          if (
            db.courses["front-end"]
              .map((course) => course.title)
              .includes(req.body.title.trim())
          ) {
            res
              .status(httpStatusCodes["Bad Request"])
              .json({ message: "Bad request! Title already exists!" });
            return;
          }

          const createdCourse = { title: req.body.title, id: Date.now() };

          db.courses["front-end"].push(createdCourse);
          res
            .status(httpStatusCodes.Created)
            .json({ data: db.courses["front-end"] });
          return;
        }

        if (req.body.course === "back-end") {
          if (
            db.courses["back-end"]
              .map((course) => course.title)
              .includes(req.body.title.trim())
          ) {
            res
              .status(httpStatusCodes["Bad Request"])
              .json({ message: "Bad request! Title already exists!" });
            return;
          }

          const createdCourse = {
            title: req.body.title.trim(),
            id: Date.now(),
          };

          db.courses["back-end"].push(createdCourse);
          res
            .status(httpStatusCodes.Created)
            .json({ data: db.courses["back-end"] });
          return;
        }
      } else {
        res
          .status(httpStatusCodes["Bad Request"])
          .json({ message: "Bad request! Title and Course must be provided!" });
      }
    });
  }

  /**
   * Deletes a course from the database.
   * @param app The express app.
   * @returns void
   */
  private static delete(app: Express): void {
    app.delete(`${this.baseUrl}/:course/:id`, (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.type("json");

      if (!req.params.id.match(/^[0-9]+$/)) {
        res
          .status(httpStatusCodes["Bad Request"])
          .json({ message: 'Bad request! "id" must be a number!' });

        return;
      } else {
        const foundCourse = db.courses[
          req.params.course as unknown as KCourses
        ].find((course) => course.id === +req.params.id);
        if (!foundCourse) {
          res
            .status(httpStatusCodes["Not Found"])
            .json({ message: `Course with id:${req.params.id} not found` });
          return;
        }

        db.courses[req.params.course as unknown as KCourses] = db.courses[
          req.params.course as unknown as KCourses
        ].filter((course) => course.id !== +req.params.id);

        res.status(httpStatusCodes["No Content"]).json();
      }
    });
  }

  private static put(app: Express): void {
    app.put(`${this.baseUrl}/:course/:id`, (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.type("json");

      if (!req.body.title) {
        res
          .status(httpStatusCodes["Bad Request"])
          .json({ message: "Bad request! Title and Course must be provided!" });

        return;
      }

      if (!req.params.id.match(/^[0-9]+$/)) {
        res
          .status(httpStatusCodes["Bad Request"])
          .json({ message: 'Bad request! "id" must be a number!' });

        return;
      }

      if(!db.courses[req.params.course as unknown as KCourses]) {
        res
          .status(httpStatusCodes["Bad Request"])
          .json({ message: `Such course "${req.params.course}" doesn't exist` });
        return;
      }

      
      if (
        !db.courses[req.params.course as unknown as KCourses].find(
          (course) => course.id === +req.params.id
        )
      ) {
        res
          .status(httpStatusCodes["Not Found"])
          .json({ message: `Course with id:${req.params.id} not found` });
        return;
      }

      db.courses[req.params.course as unknown as KCourses] = db.courses[
        req.params.course as unknown as KCourses
      ].map((course) =>
        course.id === +req.params.id
          ? { ...course, title: req.body.title.trim() }
          : course
      );
      res.status(httpStatusCodes["OK"]).json({ message: "Course updated!" });
    });
  }
}
