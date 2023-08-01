import CourseModel from './data/model.js';
import CourseView from './view/view.js';
import CourseController from './controller.js';
const model = new CourseModel();
const view = new CourseView();
const controller = new CourseController(model, view);