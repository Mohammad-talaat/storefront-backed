import supertest from 'supertest'
import db from '../../database'
import OrderModel from '../../models/orders.model'
import order from '../../types/orders.type'
import User from '../../types/user.type'
import app from '../../index'
import UserModel from '../../models/user.model'
import ProductModel from '../../models/products.model'
import product from '../../types/products.type'

const userModel = new UserModel()
const productModel = new ProductModel
const orderModel = new OrderModel()
const request = supertest(app)

describe('User API Endpoints', () => {
    let token:string,order:order,users_id:string,product_id:string,order_id:string
//   const order = {
//     users_id:  "2",
//     order_status:"active"
//   } as order
const user = {
    email: 'test65@test.com',
    user_name: 'test2User',
    first_name: 'Test',
    last_name: 'User',
    password: 'test123',
} as User

  const product = {
    name:"product 1",
    price:12
} as product


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

    const createdOrder = await orderModel.createOrder(order)
    order.order_id = createdOrder.order_id
  })

 

  afterAll(async () => {
    // clean db
    const connection = await db.connect()
    const sql = 'DELETE FROM orders;'
    await connection.query(sql)
    connection.release()
  })
  describe('Test Authenticate methods', () => {
    it('should be able to authenticate to get token', async () => {
      const res = await request
        .post('/api/v1/users/authenticate')
        .set('Content-type', 'application/json')
        .send({
            email: 'test65@test.com',
            password: 'test123',
        })
      expect(res.status).toBe(200)
      console.log(res.body)
      const {  email, token: userToken } = res.body.data
      expect(email).toBe('test65@test.com')
      token = userToken
    })
 
  describe('Test CRUD API methods', () => {
    it('should create new order', async () => {
      const res = await request
        .post('/api/v1/orders')
        // .set('Content-type', 'application/json')
        // .set('Authorization', `Bearer ${token}`)
        .send({
            users_id:`${user.id}`,
            order_status:"active",
            products:[
                {products_id:`${product.id}`,product_quantity:6}
            ]
        } as order)
      expect(res.status).toBe(200)
      const { products, users_id, order_status } = res.body.data
      expect(products[0].products_id).toBe(`${product.id}`)
      expect(users_id).toBe(`${user.id}`)
      expect(products[0].product_quantity).toEqual(6)
      expect(order_status).toBe('active')
    })

    it('should get list of orders', async () => {
      const res = await request
        .get('/api/v1/orders/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(2)
    })

    it('should get order based on order ID', async () => {
      const res = await request
        .get(`/api/v1/orders/${order.order_id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.users_id).toBe(`${order.users_id}`)
      expect(res.body.data.order_status).toBe('active')
    })
  })
})
})
