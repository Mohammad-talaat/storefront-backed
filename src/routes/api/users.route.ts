import { Router } from "express";
import * as controllers from '../../controllers/users.controller'
import validateTokenMiddleware from "../../middleware/auth.middleware";
const routes= Router()

routes.route('/')
    .get(validateTokenMiddleware,controllers.getAllUsers)
    .post(controllers.create)

routes.route('/:id')
    .get(validateTokenMiddleware,controllers.getUser)
    .patch(validateTokenMiddleware,controllers.updateUser)
    .delete(validateTokenMiddleware,controllers.deleteUser)

routes.route('/authenticate')
    .post(controllers.authenticateUser)


export default routes