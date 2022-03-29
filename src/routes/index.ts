import { Router } from "express";
import usersRoutes from './api/users.route'
import productsRoute from './api/products.route'
const routes = Router()

routes.use('/users',usersRoutes)
routes.use('/products',productsRoute)
export default routes