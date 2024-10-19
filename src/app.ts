import {UsersController} from "./Controllers/UsersController";
import {HomeController} from "./Controllers/HomeController";
import {bootstrapApp} from "../bootstrap/bootstrap.ts";
import {CoursesController} from "./Controllers/CoursesController.ts";

const {app, config, listen, urlEncodedParser} = bootstrapApp();
listen(config.server.port);


export const formParser = urlEncodedParser
const Controllers = [
    UsersController,
    HomeController,
    CoursesController,
];

Controllers.forEach(Controller => {
    Controller.init(app)
})





