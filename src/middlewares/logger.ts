import * as fs from "fs";
import type {NextFunction, Request, Response} from "express";



export function logger(request: Request, response: Response, next: NextFunction){

    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    console.log(data);
    fs.appendFile("server.log", data + "\n", function(error){
        if(error) return console.log(error);
        console.log("Запись файла завершена");
    });
    next();
}