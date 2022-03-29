import { Router } from "express";
import * as controllers from '../../controllers/users.controller'

const routes= Router()

routes.route('/')
    .get(controllers.getAllUsers)
    .post(controllers.create)

routes.route('/:id')
    .get(controllers.getUser)
    .patch(controllers.updateUser)
    .delete(controllers.deleteUser)

routes.route('/authenticate')
    .post(controllers.authenticateUser)


export default routes