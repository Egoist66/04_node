import {UsersController} from "./Controllers/UsersController";
import {HomeController} from "./Controllers/HomeController";
import {bootstrapApp} from "../bootstrap/bootstrap.ts";
import {CoursesController} from "./Controllers/CoursesController.ts";

const {app, config, listen} = bootstrapApp();
listen(config.port);


const controllers = [
    UsersController,
    HomeController,
    CoursesController,
];

controllers.forEach(controller => {
    controller.index(app)
})





