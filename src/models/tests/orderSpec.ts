import OrderModel from '../orders.model'
import db from '../../database'
import order from '../../types/orders.type'
import product from '../../types/products.type'
import ProductModel from '../products.model'
import { getAllProducts } from '../../controllers/products.controller'
import User from '../../types/user.type'
import UserModel from '../user.model'

const userModel = new UserModel()
const productModel = new ProductModel();
const orderModel = new OrderModel()

describe('#### Order Model', () => {
  describe('Test methods exists', () => {
    it('should have an Get all available orders method', () => {
      expect(orderModel.getAllOrders).toBeDefined()
    })

    it('should have a Get One order method', () => {
      expect(orderModel.getOrder).toBeDefined()
    })

    it('should have a Create order method', () => {
      expect(orderModel.createOrder).toBeDefined()
    })
  })

  describe('### Test Order Model Logic', () => {
    const user = {
        email: 'test2@test.com',
        user_name: 'test2User',
        first_name: 'Test',
        last_name: 'User',
        password: 'test123',
    } as User

      const product = {
        name:"product 1",
        price:12
    } as product

    let order :order
    

    beforeAll(async () => {
        const createdUser = await userModel.createUser(user)
        user.id = createdUser.id

        const createdProduct = await productModel.createProduct(product)
        product.id = createdProduct.id

        order = {
            users_id:`${user.id}`,
            order_status:"active",
            products:[
                {   products_id:`${product.id}`,
                    product_quantity:6
                }
            ]
            
        } as order
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql = 'DELETE FROM orders;'
      await connection.query(sql)
      connection.release()
    })

    it('Create method should return a New order', async () => {
      const createdOrder = await orderModel.createOrder(order)
      expect(createdOrder).toEqual({
        order_id: createdOrder.order_id,
        ...order
    })})

    it('Get all orders method should return All available orders in DB', async () => {
      const orders = await orderModel.getAllOrders()
      expect(orders.length).toBe(1)
    })

    it('Get order method should return test order when called with order ID', async () => {
        const createdOrder2 = await orderModel.createOrder(order)
        const returnedOrder = await orderModel.getOrder(order.order_id as string)
      expect(returnedOrder.order_id).toBe(order.order_id)//passess the test

    })
  })
})
