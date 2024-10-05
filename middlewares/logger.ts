import * as fs from "fs";
import type {NextFunction, Request, Response} from "express";


/**
 * Logs each request to the server.log file and prints the request data to the console.
 * The request data includes the time of the request, the request method, the request URL, and the user-agent.
 * @param {Request} request - The request object.
 * @param {Response} response - The response object.
 * @param {NextFunction} next - The next function in the middleware stack.
 */
export function logger(request: Request, response: Response, next: NextFunction) {

    const now = new Date();
    const data = `${now.toLocaleDateString()}:${now.toLocaleTimeString()} - ${request.method}, ${request.url}, ${request.get("user-agent")}`;
    console.log(data);
    fs.appendFile("server.log", data + "\n", function (error) {
        if (error) return console.log(error);
        console.log("Запись файла завершена");
    });
    next();
}